import { arrayContains, eq, inArray } from 'drizzle-orm';
import { db } from '../../../dbConnection';
import { Bean, beans } from '../../../Domain/Entities/beans';
import {
  recipe_beans,
  Recipe_Beans
} from '../../../Domain/Entities/recipe_beans';
import { Recipe, recipes } from '../../../Domain/Entities/recipes';
import { CreateRecipeRequestDto } from './createRecipeRequestDto';
import { products } from '../../../Domain/Entities/products';

const createRecipeCommand = async (recipeRequest: CreateRecipeRequestDto) => {
  const recipe: Recipe = {
    productId: recipeRequest.productId,
    recipeName: recipeRequest.recipeName
  };

  if (!(await isProductIdValid(recipeRequest))) {
    throw new Error('Invalid product ID provided.');
  }

  if (!areBeanAmountsValid(recipeRequest)) {
    throw new Error('Bean amounts are not valid');
  }

  // we need to see what beans are not in the db
  // to do this we first get the beans that do exist
  const beansFromDb = await db
    .select()
    .from(beans)
    .where(
      inArray(
        beans.beanName,
        recipeRequest.beans.map((b) => b.beanName)
      )
    );

  // now we filter those beans out
  const newBeansToBeAdded = recipeRequest.beans.filter((b) =>
    beansFromDb.some((bDb) => bDb.beanName != b.beanName)
  );

  await db.transaction(async (tx) => {
    // first we add the new recipe
    const newRecipeId = await tx
      .insert(recipes)
      .values(recipe)
      .returning({ insertedId: recipes.id });
    // we need to add the beans that are not saved to the db
    const newBeans = await tx
      .insert(beans)
      .values(newBeansToBeAdded)
      .returning({ insertedId: beans.id, insertedBeanName: beans.beanName });

    // now we need to associate the beans with the recipe
    // first the beans that were already in the db
    let recipeBeans: Recipe_Beans[] = [];
    beansFromDb.forEach((beanFromDb) => {
      let rb: Recipe_Beans = { amountOrdered: 0, beanId: 0, recipeId: 0 };
      const bean = recipeRequest.beans.find(
        (b) => b.beanName === beanFromDb.beanName
      );
      if (!!bean) {
        rb.amountOrdered = bean?.beanAmount || 0;
        rb.beanId = beanFromDb.id;
        rb.recipeId = newRecipeId[0].insertedId;
        recipeBeans.push(rb);
      } else {
        throw new Error('Error creating new recipe');
      }
    });
    // now add the beans that were just added to the db
    newBeans.forEach((nb) => {
      let rb: Recipe_Beans = {
        amountOrdered: 0,
        beanId: nb.insertedId,
        recipeId: 0
      };
      const bean = recipeRequest.beans.find(
        (b) => b.beanName === nb.insertedBeanName
      );
      if (!!bean) {
        rb.amountOrdered = bean?.beanAmount || 0;
        rb.recipeId = newRecipeId[0].insertedId;
        recipeBeans.push(rb);
      } else {
        throw new Error('Error creating new recipe');
      }
    });
    // finally add the recipe_beans entries into the database
    await tx.insert(recipe_beans).values(recipeBeans);
  });

  //
};

const areBeanAmountsValid = (recipeRequest: CreateRecipeRequestDto) => {
  return recipeRequest.beans.every((bean) => bean.beanAmount > 0);
};

const isProductIdValid = async (
  recipeRequest: CreateRecipeRequestDto
): Promise<boolean> => {
  if (!recipeRequest.productId) return false;
  const productId: string = recipeRequest.productId;

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));

  return product.length > 0;
};

export { createRecipeCommand };

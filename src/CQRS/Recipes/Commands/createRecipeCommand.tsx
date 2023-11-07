import { eq, inArray } from 'drizzle-orm';
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

  if (!(await areBeanNamesValid(recipeRequest))) {
    throw new Error('Invalid bean names provided.');
  }

  if (!(await areBeanIdsValid(recipeRequest))) {
    throw new Error('Invalid bean IDs provided.');
  }

  const newBeanNames: Bean[] = recipeRequest.newBeans.map((bean) => ({
    beanName: bean.beanName
  }));

  await db.transaction(async (tx) => {
    const result = await tx
      .insert(recipes)
      .values(recipe)
      .returning({ insertedId: recipes.id });

    // add preexisting beans
    let recipeBeans: Recipe_Beans[] = recipeRequest.existingBeans.map(
      (temp) => ({
        recipeId: result[0].insertedId,
        beanId: temp.beanId,
        amountOrdered: temp.beanAmount
      })
    );

    // add new beans
    const newBeans = await tx
      .insert(beans)
      .values(newBeanNames)
      .returning({ insertedId: beans.id, insertedBeanName: beans.beanName });

    const newBeansRecipeBeans: Recipe_Beans[] = [];
    newBeans.forEach((bean) => {
      const foundRecipeBean = recipeRequest.newBeans.find((b) =>
        b.beanName.includes(bean.insertedBeanName)
      );

      if (!!foundRecipeBean) {
        newBeansRecipeBeans.push({
          recipeId: result[0].insertedId,
          beanId: bean.insertedId,
          amountOrdered: foundRecipeBean.beanAmount
        });
      }
    });

    // add new beans to recipe beans
    recipeBeans = [...recipeBeans, ...newBeansRecipeBeans];
    await tx.insert(recipe_beans).values(recipeBeans);
    return result;
  });
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

const areBeanIdsValid = async (
  recipeRequest: CreateRecipeRequestDto
): Promise<boolean> => {
  const beanIds = recipeRequest.existingBeans.map((bean) => bean.beanId);

  const hasDuplicates = beanIds.length !== new Set(beanIds).size;
  if (hasDuplicates) return false;

  if (beanIds.length > 0) {
    const existingBeanIds = await db
      .select({ id: beans.id })
      .from(beans)
      .where(inArray(beans.id, beanIds));
    return beanIds.every((id) =>
      existingBeanIds.find((result) => id === result.id)
    );
  }
  return true;
  // Check if all requested beanIds exist in the database
};

const areBeanNamesValid = async (recipeRequest: CreateRecipeRequestDto) => {
  // check if bean names inputted dont exist
  let beanNames = recipeRequest.newBeans.map((bean) => bean.beanName);
  const result = await db
    .select()
    .from(beans)
    .where(inArray(beans.beanName, beanNames));

  return result.length <= 0;
};
export { createRecipeCommand };

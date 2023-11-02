import { arrayContained, arrayContains, eq, inArray } from 'drizzle-orm';
import { db } from '../../../dbConnection';
import { beans } from '../../../Domain/Entities/beans';
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

  if (!(await areBeanIdsValid(recipeRequest))) {
    throw new Error('Invalid bean IDs provided.');
  }

  const result = await db
    .insert(recipes)
    .values(recipe)
    .returning({ insertedId: recipes.id });

  const recipeBeans: Recipe_Beans[] = recipeRequest.beans.map((temp) => ({
    recipeId: result[0].insertedId,
    beanId: temp.beanId,
    amountOrdered: temp.beanAmount
  }));

  await db.insert(recipe_beans).values(recipeBeans);
  return result;
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
  const beanIds = recipeRequest.beans.map((bean) => bean.beanId);

  const hasDuplicates = beanIds.length !== new Set(beanIds).size;
  if (hasDuplicates) return false;

  const existingBeanIds = await db
    .select({ id: beans.id })
    .from(beans)
    .where(inArray(beans.id, beanIds));

  // Check if all requested beanIds exist in the database
  return beanIds.every((id) =>
    existingBeanIds.find((result) => id === result.id)
  );
};

export { createRecipeCommand };

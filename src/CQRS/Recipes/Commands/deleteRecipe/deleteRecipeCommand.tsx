import { eq, inArray } from 'drizzle-orm';
import { db } from '../../../../dbConnection';
import { recipe_beans } from '../../../../Domain/Entities/recipe_beans';
import { recipes } from '../../../../Domain/Entities/recipes';

const deleteRecipeCommand = async (deleteRecipeRequest: {
  recipeId: number;
}) => {
  await db.transaction(async (tx) => {
    // first we need to remove the recipe_beans
    await tx
      .delete(recipe_beans)
      .where(eq(recipe_beans.recipeId, deleteRecipeRequest.recipeId));

    // then we remove the recipe
    await tx
      .delete(recipes)
      .where(eq(recipes.id, deleteRecipeRequest.recipeId));
  });

  //
};
export { deleteRecipeCommand };

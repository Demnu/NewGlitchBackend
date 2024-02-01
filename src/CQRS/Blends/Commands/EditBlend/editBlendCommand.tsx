import { eq, inArray } from 'drizzle-orm';
import { blends } from '../../../../Domain/Entities/blends';
import { db } from '../../../../dbConnection';
import { EditBlendRequestDto } from './editBlendRequestDto';
import { recipes } from '../../../../Domain/Entities/recipes';

const editBlendCommand = async (request: EditBlendRequestDto) => {
  //validate if blendId exists
  if (!(await isBlendIdValid(request))) {
    throw new Error('Error editing blend, blendId does not exist');
  }
  //validate recipeIds
  if (!(await areRecipesValid(request))) {
    throw new Error('Error editing blend, one mor more recipeIds are invalid');
  }
  try {
    await db.transaction(async (tx) => {
      // first remove old recipes from the blend
      await tx
        .update(recipes)
        .set({ blendId: null })
        .where(eq(recipes.blendId, request.blendId));

      // now save the blend id for the new recipes
      if (!!request.recipeIds && request.recipeIds.length > 0) {
        await tx
          .update(recipes)
          .set({ blendId: request.blendId })
          .where(inArray(recipes.id, request.recipeIds));
      }
    });
  } catch (error) {
    throw error;
  }
};

const isBlendIdValid = async (request: EditBlendRequestDto) => {
  const result = await db
    .select()
    .from(blends)
    .where(eq(blends.id, request.blendId));

  if (result.length <= 0) {
    return false;
  }
  return true;
};

const areRecipesValid = async (request: EditBlendRequestDto) => {
  if (request.recipeIds && request.recipeIds.length > 0) {
    const result = await db
      .select()
      .from(recipes)
      .where(inArray(recipes.id, request.recipeIds));
    if (result.length != request.recipeIds.length) {
      return false;
    }
  }
  return true;
};
export { editBlendCommand };

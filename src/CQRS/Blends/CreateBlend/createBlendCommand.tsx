import { eq, inArray } from 'drizzle-orm';
import { recipes } from '../../../Domain/Entities/recipes';
import { db } from '../../../dbConnection';
import { CreateBlendRequestDto } from './createBlendRequestDto';
import { blends } from '../../../Domain/Entities/blends';

const createBlendCommand = async (request: CreateBlendRequestDto) => {
  let blendId;
  // validate recipe ids
  if (!(await areRecipesValid(request))) {
    throw Error('Error saving blend, at least one recipeId is invalid');
  }
  // validate that the blend name doesnt already exist
  if (!(await isBlendNameValid(request))) {
    throw Error('Error saving blend, blendName already exists');
  }

  try {
    await db.transaction(async (tx) => {
      // first save the blend
      const savedBlend = await tx
        .insert(blends)
        .values({ blendName: request.blendName })
        .returning({ blendId: blends.id });

      blendId = savedBlend[0].blendId;
      // now save the blend id for the recipes
      if (!!request.recipeIds) {
        await tx
          .update(recipes)
          .set({ blendId: blendId })
          .where(inArray(recipes.id, request.recipeIds));
      }
    });
  } catch (error) {
    throw error;
  }

  return blendId;
};

const isBlendNameValid = async (request: CreateBlendRequestDto) => {
  const result = await db
    .select()
    .from(blends)
    .where(eq(blends.blendName, request.blendName));
  if (result.length > 0) {
    return false;
  }
  return true;
};

const areRecipesValid = async (request: CreateBlendRequestDto) => {
  if (request.recipeIds) {
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
export { createBlendCommand };

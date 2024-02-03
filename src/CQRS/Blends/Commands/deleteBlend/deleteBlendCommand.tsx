import { eq, inArray } from 'drizzle-orm';
import { blends } from '../../../../Domain/Entities/blends';
import { db } from '../../../../dbConnection';
import { recipes } from '../../../../Domain/Entities/recipes';
import { DeleteBlendRequestDto } from './deleteBlendRequestDto';

const deleteBlendCommand = async (request: DeleteBlendRequestDto) => {
  //validate if blendId exists
  if (!(await isBlendIdValid(request))) {
    throw new Error('Error deleting blend, blendId does not exist');
  }
  try {
    await db.transaction(async (tx) => {
      // first remove the blend from the recipes
      await tx
        .update(recipes)
        .set({ blendId: null })
        .where(eq(recipes.blendId, request.blendId));

      // now delete the blend
      await tx.delete(blends).where(eq(blends.id, request.blendId));
    });
  } catch (error) {
    throw error;
  }
};

const isBlendIdValid = async (request: DeleteBlendRequestDto) => {
  const result = await db
    .select()
    .from(blends)
    .where(eq(blends.id, request.blendId));

  if (result.length <= 0) {
    return false;
  }
  return true;
};
export { deleteBlendCommand };

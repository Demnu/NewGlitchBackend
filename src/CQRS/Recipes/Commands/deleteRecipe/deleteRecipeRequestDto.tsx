import { z } from 'zod';

const DeleteRecipeRequestDtoSchema = z.object({
  recipeId: z.number()
});

type DeleteRecipeRequestDto = z.infer<typeof DeleteRecipeRequestDtoSchema>;
const DeleteRecipeRequestDtoJsonSchema = {
  $recipeId: 1000
};
export {
  DeleteRecipeRequestDto,
  DeleteRecipeRequestDtoSchema,
  DeleteRecipeRequestDtoJsonSchema
};

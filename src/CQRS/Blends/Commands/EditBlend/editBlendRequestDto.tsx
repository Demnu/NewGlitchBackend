import { z } from 'zod';

const EditBlendRequestDtoSchema = z.object({
  blendId: z.number(),
  recipeIds: z.number().array().optional()
});

type EditBlendRequestDto = z.infer<typeof EditBlendRequestDtoSchema>;
const EditBlendRequestDtoJsonSchema = {
  $blendId: 123,
  recipeIds: [1, 2, 3, 4, 5]
};
export {
  EditBlendRequestDto,
  EditBlendRequestDtoSchema,
  EditBlendRequestDtoJsonSchema
};

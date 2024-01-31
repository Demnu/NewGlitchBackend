import { z } from 'zod';

const CreateBlendRequestDtoSchema = z.object({
  blendName: z.string(),
  recipeIds: z.number().array().optional()
});

type CreateBlendRequestDto = z.infer<typeof CreateBlendRequestDtoSchema>;
const CreateBlendRequestDtoJsonSchema = {
  $blendName: 'Yummy recipe',
  recipeIds: [1, 2, 3, 4, 5]
};
export {
  CreateBlendRequestDto,
  CreateBlendRequestDtoSchema,
  CreateBlendRequestDtoJsonSchema
};

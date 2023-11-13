import { z } from 'zod';

const MarkAsNotRecipeRequestDtoSchema = z.object({
  productName: z.string()
});

type MarkAsNotRecipeRequestDto = z.infer<
  typeof MarkAsNotRecipeRequestDtoSchema
>;

const MarkAsNotRecipeRequestDtoJsonSchema = {
  $productName: 'Haywire 1kg'
};

export {
  MarkAsNotRecipeRequestDtoSchema,
  MarkAsNotRecipeRequestDtoJsonSchema,
  MarkAsNotRecipeRequestDto
};

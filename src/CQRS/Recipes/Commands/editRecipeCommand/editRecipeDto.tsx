import { z } from 'zod';

const NewBeanRecipeSchema = z.object({
  beanName: z.string(),
  beanAmount: z.number()
});

const EditRecipeRequestDtoSchema = z.object({
  recipeId: z.number(),
  beans: z.array(NewBeanRecipeSchema)
});

type EditRecipeRequestDto = z.infer<typeof EditRecipeRequestDtoSchema>;
const EditRecipeRequestDtoJsonSchema = {
  $recipeId: 12345,
  $beans: [{ $beanName: 'New Bean', $beanAmount: 400 }]
};
export {
  EditRecipeRequestDto,
  EditRecipeRequestDtoSchema,
  EditRecipeRequestDtoJsonSchema
};

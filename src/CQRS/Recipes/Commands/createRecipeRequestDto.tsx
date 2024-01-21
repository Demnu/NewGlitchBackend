import { z } from 'zod';

const NewBeanRecipeSchema = z.object({
  beanName: z.string(),
  beanAmount: z.number()
});

const CreateRecipeRequestDtoSchema = z.object({
  productId: z.string(),
  recipeName: z.string(),
  beans: z.array(NewBeanRecipeSchema)
});

type CreateRecipeRequestDto = z.infer<typeof CreateRecipeRequestDtoSchema>;
const CreateRecipeRequestDtoJsonSchema = {
  $productId: '270551eb-4b20-43c1-9258-f474bb9745bc',
  $recipeName: 'Yummy recipe',
  $beans: [{ $beanName: 'New Bean', $beanAmount: 400 }]
};
export {
  CreateRecipeRequestDto,
  CreateRecipeRequestDtoSchema,
  CreateRecipeRequestDtoJsonSchema
};

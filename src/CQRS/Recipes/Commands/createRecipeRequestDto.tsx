import { z } from 'zod';

const ExistingBeanRecipeSchema = z.object({
  beanId: z.number(),
  beanAmount: z.number()
});

const NewBeanRecipeSchema = z.object({
  beanName: z.string(),
  beanAmount: z.number()
});

const CreateRecipeRequestDtoSchema = z.object({
  productId: z.string(),
  recipeName: z.string(),
  existingBeans: z.array(ExistingBeanRecipeSchema),
  newBeans: z.array(NewBeanRecipeSchema)
});

type CreateRecipeRequestDto = z.infer<typeof CreateRecipeRequestDtoSchema>;
const CreateRecipeRequestDtoJsonSchema = {
  $productId: '270551eb-4b20-43c1-9258-f474bb9745bc',
  $recipeName: 'Yummy recipe',
  $existingBeans: [{ $beanId: 3, $beanAmount: 200 }],
  $newBeans: [{ $beanName: 'New Bean', $beanAmount: 400 }]
};
export {
  CreateRecipeRequestDto,
  CreateRecipeRequestDtoSchema,
  CreateRecipeRequestDtoJsonSchema
};

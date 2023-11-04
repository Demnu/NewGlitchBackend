import { z } from 'zod';

const BeanRecipeSchema = z.object({
  beanId: z.number(),
  beanAmount: z.number()
});

const CreateRecipeRequestDtoSchema = z.object({
  productId: z.string(),
  recipeName: z.string(),
  beans: z.array(BeanRecipeSchema)
});

type CreateRecipeRequestDto = z.infer<typeof CreateRecipeRequestDtoSchema>;

const CreateRecipeRequestDtoJsonSchema: CreateRecipeRequestDto = {
  productId: '2',
  recipeName: 'Yummy recipe',
  beans: [
    { beanId: 3, beanAmount: 200 },
    { beanId: 4, beanAmount: 400 }
  ]
};
export {
  CreateRecipeRequestDto,
  CreateRecipeRequestDtoSchema,
  CreateRecipeRequestDtoJsonSchema
};

import { Recipe } from '../../../Domain/Entities/recipes';

export interface CreateRecipeRequestDto extends Recipe {
  beans: Bean_Recipe[];
}

interface Bean_Recipe {
  beanId: number;
  beanAmount: number;
}

export const CreateRecipeRequestDtoJsonSchema: CreateRecipeRequestDto = {
  productId: '2',
  recipeName: 'Yummy recipe',
  beans: [
    { beanId: 3, beanAmount: 200 },
    { beanId: 4, beanAmount: 400 }
  ]
};

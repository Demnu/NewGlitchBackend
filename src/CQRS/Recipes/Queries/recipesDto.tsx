import { Bean } from '../../../Domain/Entities/beans';
import { Product } from '../../../Domain/Entities/products';
import { Recipe_Beans } from '../../../Domain/Entities/recipe_beans';
import { Recipe } from '../../../Domain/Entities/recipes';

interface RecipeDto extends Recipe {
  recipe_beans: RecipeBeans_Beans[];
}

interface RecipeBeans_Beans extends Recipe_Beans {
  bean: Bean;
}

export const RecipeDtoJsonSchema: RecipeDto = {
  id: 1234,
  productId: 'Blurger',
  recipeName: 'Yummy Blend',
  recipe_beans: [
    {
      id: 1,
      beanId: 2,
      recipeId: 3,
      amountOrdered: 100,
      bean: { id: 2, beanName: 'Roasty bean' }
    }
  ]
};

export { RecipeDto };

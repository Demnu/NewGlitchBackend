import { Router } from 'express';
import {
  createRecipeController,
  listRecipesController
} from '../Controllers/recipesController';

const router = Router();

router.get(
  '/listRecipes',
  listRecipesController /* #swagger.responses[200] = {
  description: 'Recieve recipes!',
  schema: { $ref: '#/definitions/OrderDtos' }
} */
);

router.post(
  '/createRecipe',
  createRecipeController
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a recipe!',
            schema: { $ref: '#/definitions/RecipeRequestDto' }
    } */
);

export default router;

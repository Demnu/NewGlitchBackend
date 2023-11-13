import { Router } from 'express';
import {
  createRecipeController,
  listRecipesController,
  markAsNotRecipeController
} from '../Controllers/recipesController';

const router = Router();

router.get(
  '/listRecipes',
  listRecipesController /* #swagger.responses[200] = {
  description: 'Recieve recipes!',
  schema: { $ref: '#/definitions/RecipeDtos' }
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

router.post(
  '/markProductAsNotRecipe',
  markAsNotRecipeController
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a recipe!',
            schema: { $ref: '#/definitions/MarkAsNotRecipeRequestDto' }
    } */
);

export default router;

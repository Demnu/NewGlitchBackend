import { Router } from 'express';
import {
  createRecipeController,
  listRecipesController
} from '../Controllers/recipesController';

const router = Router();

router.get(
  '/listRecipes',
  listRecipesController
  /*
  #swagger.tags = ['Recipes']
  */
);

router.post(
  '/createRecipe',
  createRecipeController
  /*
  #swagger.tags = ['Recipes']
  */
);

export default router;

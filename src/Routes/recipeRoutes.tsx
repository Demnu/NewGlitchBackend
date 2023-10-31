import { Router } from 'express';
import {
  createRecipeController,
  listRecipesController
} from '../Controllers/recipesController';

const router = Router();

router.get('/listRecipes', listRecipesController);

router.post('/createRecipe', createRecipeController);

export default router;

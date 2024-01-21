import { Router } from 'express';
import {
  createRecipeController,
  listRecipesController,
  markAsNotRecipeController
} from '../Controllers/recipesController';
import { listProductsWithNoRecipeController } from '../Controllers/productsController';

const router = Router();

router.get(
  '/listProductsWithNoRecipes',
  listProductsWithNoRecipeController /* #swagger.responses[200] = {
  description: 'Recieve products with no recipes!',
  schema: { $ref: '#/definitions/ListProductsWithNoRecipeDtos' }
} */
);

export default router;

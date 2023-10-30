import { Router } from 'express';
import listRecipesQuery from '../CQRS/Recipes/Queries/listRecipesQuery';

const router = Router();

router.get(
  '/listRecipes',
  listRecipesQuery
  /*
  #swagger.tags = ['Recipes']
  */
);

export default router;

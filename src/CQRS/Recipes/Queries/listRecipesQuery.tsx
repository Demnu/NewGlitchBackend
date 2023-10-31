import { Request, Response, Router } from 'express';
import db from '../../../dbConnection';

const listRecipesQuery = async () => {
  return await db.query.recipes.findMany({
    with: {
      recipe_beans: { with: { bean: true } }
    }
  });
};

export default listRecipesQuery;

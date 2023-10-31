import { Request, Response, Router } from 'express';
import db from '../../../dbConnection';

const listRecipesQuery = async () => {
  const recipes = await db.query.recipes.findMany({
    with: {
      recipe_beans: { with: { bean: true } }
    }
  });

  return recipes;
};

export default listRecipesQuery;

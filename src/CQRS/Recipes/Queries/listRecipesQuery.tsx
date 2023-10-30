import { Request, Response, Router } from 'express';
import db from '../../../dbConnection';
const listRecipesQuery = async (req: Request, res: Response) => {
  const results = await db.query.recipes.findMany({
    with: {
      recipe_beans: { with: { bean: true } }
    }
  });

  res.send(results);
};

export default listRecipesQuery;

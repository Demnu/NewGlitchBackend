import { db } from '../../../dbConnection';

const listRecipesQuery = async () => {
  const recipes = await db.query.recipes.findMany({
    with: {
      recipe_beans: { with: { bean: true } },
      blends: true
    }
  });

  return recipes;
};

export { listRecipesQuery };

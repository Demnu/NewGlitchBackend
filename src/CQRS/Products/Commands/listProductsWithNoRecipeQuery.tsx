import { db } from '../../../dbConnection';
const listProductsWithNoRecipeQuery = async () => {
  // TODO figure out how to
  const results = await db.query.products.findMany({
    with: {
      recipe: true
    }
  });
  // get products with no recipe
  const filteredResults = results.filter((p) => p.recipe == null);

  return filteredResults;
};

export { listProductsWithNoRecipeQuery };

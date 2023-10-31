import db from '../../../dbConnection';
import { Recipe, recipes } from '../../../Domain/Entities/recipes';

const createRecipeCommand = async (recipe: Recipe) => {
  return await db.insert(recipes).values(recipe).execute();
};

export default createRecipeCommand;

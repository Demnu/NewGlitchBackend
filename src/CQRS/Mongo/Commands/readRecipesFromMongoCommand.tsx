import {
  Recipe_Beans,
  recipe_beans
} from '../../../Domain/Entities/recipe_beans';
import { Recipe, recipes } from '../../../Domain/Entities/recipes';
import { RecipeTransformer } from '../../../Utilities/ReadFromMongo/readAndSaveRecipesFromMongo';
import { db } from '../../../dbConnection';
import { Request, Response } from 'express';

const readRecipesFromMongoCommand = async (req: Request, res: Response) => {
  const transform = new RecipeTransformer('recipes.json');
  let recipesTemp = transform.transform();

  // get beans from the database
  const beansFromDb = await db.query.beans.findMany();

  // Map bean names to their IDs
  const beanNameToIdMap = beansFromDb.reduce(
    (acc, bean) => {
      if (bean.beanName) {
        // Check if beanName is not null before assigning it as a key
        acc[bean.beanName] = bean.id;
      }
      return acc;
    },
    {} as { [key: string]: number }
  );

  // Add beanIds to the beans in the recipes
  recipesTemp = recipesTemp.map((recipe) => {
    recipe.beans = recipe.beans.map((bean) => {
      bean.beanId = beanNameToIdMap[bean.beanName];
      return bean;
    });
    return recipe;
  });

  // Get corresponding product id
  const productsFromDb = await db.query.products.findMany();

  // Map product names to their IDs
  const productNameToIdMap = productsFromDb.reduce(
    (acc, product) => {
      acc[product.productName] = product.id; // Assuming products have 'productName' and 'id' properties
      return acc;
    },
    {} as { [key: string]: string }
  );

  // Add productIds to the recipes
  recipesTemp = recipesTemp.map((recipe) => {
    recipe.productId = productNameToIdMap[recipe.recipeName];
    return recipe;
  });

  // NOTE because I have only retreived new products from ordermentum some recipes wont have a corresponding product id and will not be saved to the database
  // add recipes and recipe_beans to database
  recipesTemp.forEach(async (recipe) => {
    if (recipe.productId != undefined) {
      const newRecipe: Recipe = {
        recipeName: recipe.recipeName,
        productId: recipe.productId
      };
      await db.transaction(async (tx) => {
        const savedRecipe = await tx
          .insert(recipes)
          .values(newRecipe)
          .returning({ insertedId: recipes.id });

        // create recipe bean entries
        recipe.beans.forEach(async (bean) => {
          if (!!bean.beanId) {
            const recipeBeanEntry: Recipe_Beans = {
              recipeId: savedRecipe[0].insertedId,
              beanId: bean.beanId,
              amountOrdered: bean.amount
            };
            await tx.insert(recipe_beans).values(recipeBeanEntry);
          } else {
            tx.rollback();
          }
        });
      });
    }
  });
};

export default readRecipesFromMongoCommand;

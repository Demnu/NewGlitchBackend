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

  recipesTemp.forEach(async (recipe) => {
    if (recipe.productId != undefined) {
      const newRecipe: Recipe = {
        recipeName: recipe.recipeName,
        productId: recipe.productId
      };
      const savedRecipe = await db.insert(recipes).values(newRecipe);
    }
  });
  // Query the database to get all saved recipes
  const savedRecipes = await db.query.recipes.findMany();

  // Map recipe names to their IDs
  const recipeNameToIdMap = savedRecipes.reduce(
    (acc, recipe) => {
      if (recipe.recipeName) {
        // Check if recipeName is not null
        acc[recipe.recipeName] = recipe.id;
      }
      return acc;
    },
    {} as { [key: string]: number }
  ); // Assuming recipe.id is a number
  // Create entries in the Recipe_Beans entity

  for (let recipe of recipesTemp) {
    const recipeId = recipeNameToIdMap[recipe.recipeName];
    for (let bean of recipe.beans) {
      const recipeBeanEntry: Recipe_Beans = {
        recipeId: recipeId,
        beanId: bean.beanId,
        amountOrdered: bean.amount
      };
      // Save the recipeBeanEntry to the Recipe_Beans entity
      await db.insert(recipe_beans).values(recipeBeanEntry);
    }
  }
};

export default readRecipesFromMongoCommand;

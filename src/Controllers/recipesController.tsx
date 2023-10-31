import { Router, Request, Response } from 'express';
import listRecipesQuery from '../CQRS/Recipes/Queries/listRecipesQuery';
import createRecipeCommand from '../CQRS/Recipes/Commands/createRecipeCommand';
import { Recipe } from '../Domain/Entities/recipes';

const router = Router();

const listRecipesController = async (req: Request, res: Response) => {
  /* #swagger.responses[200] = {
            description: 'Recieve recipes!',
            schema: { $ref: '#/definitions/OrderDtos' }
    } */
  try {
    const results = await listRecipesQuery();
    res.send(results);
  } catch (error) {
    // Check if the error is an instance of the Error class
    if (error instanceof Error) {
      res
        .status(500)
        .send({ message: 'Failed to create recipe', error: error.message });
    } else {
      res.status(500).send({
        message: 'Failed to create recipe',
        error: 'Unknown error occurred'
      });
    }
  }
};

const createRecipeController = async (req: Request, res: Response) => {
  try {
    const recipe = req.body as Recipe;
    const result = await createRecipeCommand(recipe);
    res.send(result);
  } catch (error) {
    // Check if the error is an instance of the Error class
    if (error instanceof Error) {
      res
        .status(500)
        .send({ message: 'Failed to create recipe', error: error.message });
    } else {
      res.status(500).send({
        message: 'Failed to create recipe',
        error: 'Unknown error occurred'
      });
    }
  }
};

export { listRecipesController, createRecipeController };

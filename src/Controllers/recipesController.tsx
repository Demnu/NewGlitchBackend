import { Router, Request, Response, NextFunction } from 'express';
import { listRecipesQuery } from '../CQRS/Recipes/Queries/listRecipesQuery';
import { createRecipeCommand } from '../CQRS/Recipes/Commands/createRecipeCommand';
import { CreateRecipeRequestDtoSchema } from '../CQRS/Recipes/Commands/createRecipeRequestDto';

const listRecipesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await listRecipesQuery();
    res.send(results);
  } catch (error) {
    next(error);
  }
};

const createRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    CreateRecipeRequestDtoSchema.parse(req.body);
    const result = await createRecipeCommand(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export { listRecipesController, createRecipeController };

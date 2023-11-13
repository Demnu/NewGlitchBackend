import { Router, Request, Response, NextFunction } from 'express';
import { listRecipesQuery } from '../CQRS/Recipes/Queries/listRecipesQuery';
import { createRecipeCommand } from '../CQRS/Recipes/Commands/createRecipeCommand';
import { CreateRecipeRequestDtoSchema } from '../CQRS/Recipes/Commands/createRecipeRequestDto';
import { MarkAsNotRecipeRequestDtoSchema } from '../CQRS/Recipes/Commands/markAsNotRecipeCommand/markAsNotRecipeRequestDto';
import { markAsNotRecipeCommand } from '../CQRS/Recipes/Commands/markAsNotRecipeCommand/markAsNotRecipeCommand';

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

const markAsNotRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedResults = MarkAsNotRecipeRequestDtoSchema.parse(req.body);
    const result = await markAsNotRecipeCommand(parsedResults);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export {
  listRecipesController,
  createRecipeController,
  markAsNotRecipeController
};

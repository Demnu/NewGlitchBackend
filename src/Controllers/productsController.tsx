import { Request, Response, NextFunction } from 'express';
import { listLogsQuery } from '../CQRS/Logs/Queries/listLogsQuery';
import { listProductsWithNoRecipeQuery } from '../CQRS/Products/Commands/listProductsWithNoRecipeQuery';

const listProductsWithNoRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await listProductsWithNoRecipeQuery();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
export { listProductsWithNoRecipeController };

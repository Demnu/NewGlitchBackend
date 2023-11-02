import { NextFunction, Request, Response, Router } from 'express';
import { listOrdersQuery } from '../CQRS/Orders/Queries/listOrdersQuery';

const router = Router();

const listOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await listOrdersQuery();
    res.send(results);
  } catch (error) {
    next(error);
  }
};

export { listOrdersController };

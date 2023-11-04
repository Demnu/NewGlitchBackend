import { NextFunction, Request, Response } from 'express';
import { listOrdersQuery } from '../CQRS/Orders/Queries/listOrdersQuery';

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

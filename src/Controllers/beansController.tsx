import { NextFunction, Request, Response } from 'express';
import { listBeansQuery } from '../CQRS/Beans/Queries/listBeansQuery';

const listBeansController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await listBeansQuery();
    res.send(results);
  } catch (error) {
    next(error);
  }
};

export { listBeansController };

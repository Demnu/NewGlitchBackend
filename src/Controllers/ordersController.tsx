import { NextFunction, Request, Response } from 'express';
import { listOrdersQuery } from '../CQRS/Orders/Queries/listOrdersQuery';
import { ListOrdersRequestDtoSchema } from '../CQRS/Orders/Queries/listOrdersRequestDto';

const listOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = ListOrdersRequestDtoSchema.parse(req.body);
    const results = await listOrdersQuery(query);
    res.send(results);
  } catch (error) {
    next(error);
  }
};

export { listOrdersController };

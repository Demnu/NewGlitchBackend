import { Request, Response, Router } from 'express';
import listOrdersQuery from '../CQRS/Orders/Queries/listOrdersQuery';

const router = Router();

const listOrdersController = async (req: Request, res: Response) => {
  try {
    const results = await listOrdersQuery();
    res.send(results);
  } catch (error) {
    // Check if the error is an instance of the Error class
    res.status(500).send({
      message: 'Failed to create recipe',
      error: 'Unknown error occurred'
    });
  }
};

export { listOrdersController };

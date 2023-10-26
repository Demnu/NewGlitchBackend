import { Request, Response, Router } from 'express';
import listOrdersQuery from '../CQRS/Orders/Queries/listOrdersQuery';

const router = Router();

router.get(
  '/listOrders',
  listOrdersQuery
  /*
  #swagger.tags = ['Orders']
  */
);

export default router;

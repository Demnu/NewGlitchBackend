import { Router } from 'express';
import { listOrdersController } from '../Controllers/ordersController';

const router = Router();

// Change this to a GET request when the related issue is resolved
router.post(
  '/listOrders',
  listOrdersController
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add filters for orders!',
            schema: { $ref: '#/definitions/ListOrdersRequestDto' }
    } */
  /* #swagger.responses[200] = {
    description: 'Recieve orders!',
    schema: { $ref: '#/definitions/OrderDtos' }
  } */
);

export default router;

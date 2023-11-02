import { Router } from 'express';
import { listOrdersController } from '../Controllers/ordersController';

const router = Router();

router.get(
  '/listOrders',
  listOrdersController /* #swagger.responses[200] = {
    description: 'Recieve orders!',
    schema: { $ref: '#/definitions/OrderDtos' }
} */
);

export default router;

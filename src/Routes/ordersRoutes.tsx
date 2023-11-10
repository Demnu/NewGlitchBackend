import { Router } from 'express';
import { listOrdersController } from '../Controllers/ordersController';

const router = Router();

//TODO change to GET request when https://github.com/swagger-autogen/swagger-autogen/issues/235 is solved
router.post(
  '/listOrders',

  listOrdersController /* #swagger.responses[200] = {
    description: 'Recieve orders!',
    schema: { $ref: '#/definitions/OrderDtos' },
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Enter optional filters!',
            schema: { $ref: '#/definitions/ListOrdersRequestDto' }
} */
);

export default router;

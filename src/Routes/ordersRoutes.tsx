import { Router } from 'express';
import { listOrdersController } from '../Controllers/ordersController';

const router = Router();

router.get('/listOrders', listOrdersController);

export default router;

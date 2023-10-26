import { Request, Response, Router } from 'express';
import saveProductsFromOrdermentumCommand from '../CQRS/Ordermentum/Commands/saveProductsFromOrdermentumCommand';
import saveOrdersFromOrdermentumCommand from '../CQRS/Ordermentum/Commands/saveOrdersFromOrdermentumCommand';

const router = Router();

router.get('/saveProductsFromOrdermentum', saveProductsFromOrdermentumCommand);
router.get('/saveOrdersFromOrdermentum', saveOrdersFromOrdermentumCommand);

export default router;

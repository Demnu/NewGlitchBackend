import { Router } from 'express';
import saveProductsFromOrdermentumCommand from '../CQRS/Ordermentum/Commands/saveProductsFromOrdermentumCommand';
import saveOrdersFromOrdermentumCommand from '../CQRS/Ordermentum/Commands/saveOrdersFromOrdermentumCommand';

const router = Router();

router.post(
  '/saveProductsFromOrdermentum',
  saveProductsFromOrdermentumCommand
  /*
  #swagger.tags = ['Ordermentum']
  */
);
router.post(
  '/saveOrdersFromOrdermentum',
  saveOrdersFromOrdermentumCommand
  /*
  #swagger.tags = ['Ordermentum']
  */
);

export default router;

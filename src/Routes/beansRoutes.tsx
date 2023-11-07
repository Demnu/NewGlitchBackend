import { Router } from 'express';
import { listBeansController } from '../Controllers/beansController';

const router = Router();

router.get(
  '/listBeans',
  listBeansController /* #swagger.responses[200] = {
    description: 'Recieve beans!',
    schema: { $ref: '#/definitions/BeanDtos' }
} */
);

export default router;

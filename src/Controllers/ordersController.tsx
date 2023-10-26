import { Request, Response, Router } from 'express';
import listOrdersQuery from '../CQRS/Orders/Queries/listOrdersQuery';

const router = Router();

// Home page route.
router.get('/', function (req: Request, res: Response) {
  res.send('Wiki home page');
});

// About page route.
router.get('/about', function (req: Request, res: Response) {
  res.send('About this wiki');
});

router.get('/listOrders', listOrdersQuery);

export default router;

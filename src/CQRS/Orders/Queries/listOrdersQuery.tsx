import { Request, Response, Router } from 'express';
import OrderDto from './orderDto';
import db from '../../../dbConnection';
import { Product } from '../../../Domain/Entities/products';
const listOrders = async (req: Request, res: Response) => {
  // #swagger.tags = ['Orders']
  // const result = await db.query.orders_products.findMany({with:{order:'true'}})
  const results = await db.query.orders.findMany({
    with: {
      order_products: { with: { product: true } }
    }
  });

  var orderDtos: OrderDto[] = results.map((result) => {
    var orderDto: OrderDto = {
      orderId: result.id,
      customerName: result.customerName
    };
    var products: Product[] = result.order_products
      .map((op) => op.product)
      .filter((product) => product !== null) as Product[];
    orderDto.products = products;
    return orderDto;
  });
  res.send(orderDtos);
};

export default listOrders;

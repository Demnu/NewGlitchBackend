import { Request, Response, Router } from 'express';
import OrderDto from './orderDto';
import { db } from '../../../dbConnection';
import { Product } from '../../../Domain/Entities/products';
const listOrdersQuery = async () => {
  const results = await db.query.orders.findMany({
    with: {
      order_products: { with: { product: true } }
    }
  });

  var orderDtos: OrderDto[] = results.map((result) => {
    // Convert UTC Date to server's local Date

    var orderDto: OrderDto = {
      orderId: result.id,
      customerName: result.customerName,
      dateCreated: new Date(result.createdAt).toLocaleString()
    };
    var products: Product[] = result.order_products
      .map((op) => op.product)
      .filter((product) => product !== null) as Product[];
    orderDto.products = products;
    return orderDto;
  });

  // sort by descending order
  orderDtos = orderDtos.sort((a, b) => {
    const dateA = new Date(a.dateCreated);
    const dateB = new Date(b.dateCreated);
    return dateB.getTime() - dateA.getTime();
  });

  return orderDtos;
};

export { listOrdersQuery };

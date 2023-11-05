import { Request, Response, Router } from 'express';
import { OrderDto, ProductExtended } from './orderDto';
import { db } from '../../../dbConnection';
import { Product } from '../../../Domain/Entities/products';
const listOrdersQuery = async () => {
  const results = await db.query.orders.findMany({
    with: {
      order_products: { with: { product: true } }
    }
  });

  var orderDtos: OrderDto[] = results.map((order) => {
    // Convert UTC Date to server's local Date

    var orderDto: OrderDto = {
      orderId: order.id,
      customerName: order.customerName,
      dateCreated: new Date(order.createdAt).toLocaleString()
    };

    var products: ProductExtended[] = order.order_products.map((op) => {
      const product = op.product;
      return {
        id: product.id,
        amountOrdered: op.amountOrdered,
        sku: product.sku,
        price: product.price,
        productName: product.productName,
        possiblyCoffee: product.possiblyCoffee
      };
    });
    // var products: Product[] = order.order_products
    //   .map((op) => op.product)
    //   .filter((product) => product !== null) as Product[];

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

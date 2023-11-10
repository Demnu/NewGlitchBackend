import { Request, Response, Router } from 'express';
import { OrderDto, ProductExtended } from './orderDto';
import { db } from '../../../dbConnection';
import { Product } from '../../../Domain/Entities/products';
import { ListOrdersRequestDto } from './listOrdersRequestDto';
import dayjs from 'dayjs';
import { orders } from '../../../Domain/Entities/orders';
import { gte, lte } from 'drizzle-orm';
const listOrdersQuery = async (listOrdersRequest: ListOrdersRequestDto) => {
  if (!(await areDatesValid(listOrdersRequest))) {
    throw new Error('dateTo must be a later date than dateFrom');
  }
  const dateFrom = listOrdersRequest.dateFrom
    ? new Date(listOrdersRequest.dateFrom)
    : dayjs().subtract(2, 'day').toDate();
  const dateTo = listOrdersRequest.dateTo
    ? new Date(listOrdersRequest.dateTo)
    : dayjs().toDate();

  // Convert dates to ISO strings for querying
  const isoDateFrom = dateFrom.toISOString();
  const isoDateTo = dateTo.toISOString();

  const results = await db.query.orders.findMany({
    where: gte(orders.createdAt, isoDateFrom),
    with: {
      order_products: {
        with: {
          product: {
            with: { recipe: true }
          }
        }
      }
    }
  });

  var orderDtos: OrderDto[] = results.map((order) => {
    // Convert UTC Date to server's local Date

    var orderDto: OrderDto = {
      id: order.id,
      customerName: order.customerName,
      dateCreated: new Date(order.createdAt).toLocaleString(),
      orderStatus: order.orderStatus,
      invoiceNumber: order.invoiceNumber || ''
    };

    var products: ProductExtended[] = order.order_products.map((op) => {
      const product = op.product;
      return {
        id: product.id,
        amountOrdered: op.amountOrdered,
        sku: product.sku,
        price: product.price,
        productName: product.productName,
        possiblyCoffee: product.possiblyCoffee,
        hasRecipe: product.recipe != null
      };
    });
    // var products: Product[] = order.order_products
    //   .map((op) => op.product)
    //   .filter((product) => product !== null) as Product[];

    orderDto.products = products.sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
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

const areDatesValid = async (
  listOrdersRequest: ListOrdersRequestDto
): Promise<boolean> => {
  const dateTo = listOrdersRequest.dateTo;
  const dateFrom = listOrdersRequest.dateFrom;

  // check if dateTo is before dateFrom
  if (!!dateTo && !!dateFrom && dateTo < dateFrom) {
    return false;
  }
  return true;
};

export { listOrdersQuery };

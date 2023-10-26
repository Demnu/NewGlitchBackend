import { Request, Response, Router } from 'express';
import ordermentumClient from '../../../ordermentumConnection';
import db from '../../../dbConnection';
import { eq, inArray } from 'drizzle-orm';
import { orders } from '../../../Domain/Entities/orders';
import { readOrders } from '../../../Utilities/Ordermentum/readAndSaveOrders';
import { orders_products } from '../../../Domain/Entities/orders_products';
const saveOrdersFromOrdermentumCommand = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getOrdersFromOrdermentum();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Failed to get products from Ordermentum');
  }
};

export async function getOrdersFromOrdermentum(): Promise<string> {
  // Set your custom pagination settings
  const customPagination = {
    pageSize: 30,
    pageNo: 1,
    filter: 'b0d7ba3e-4ab1-4c1b-85ec-1275cd6687b9'
  };

  // Fetch products for each supplier with the custom pagination settings
  const distResults = await ordermentumClient.orders.findAll({
    ...customPagination,
    supplierId: process.env.DIST_SUPPLIER_ID
  });
  const flamResults = await ordermentumClient.orders.findAll({
    ...customPagination,
    supplierId: process.env.FLAM_SUPPLIER_ID
  });
  const glitchResults = await ordermentumClient.orders.findAll({
    ...customPagination,
    supplierId: process.env.GLITCH_SUPPLIER_ID
  });

  let {
    formattedOrders: distOrders,
    orderProductsFormatted: distOrderProducts
  } = readOrders(distResults.data, process.env.DIST_SUPPLIER_ID);

  let {
    formattedOrders: flamOrders,
    orderProductsFormatted: flamOrderProducts
  } = readOrders(flamResults.data, process.env.FLAM_SUPPLIER_ID);

  let {
    formattedOrders: glitchOrders,
    orderProductsFormatted: glitchOrderProducts
  } = readOrders(glitchResults.data, process.env.GLITCH_SUPPLIER_ID);

  // update saved orders
  const formattedOrders = [...distOrders, ...flamOrders, ...glitchOrders];

  const orderIds = formattedOrders.map((formattedOrder) => formattedOrder.id);

  const results = await db
    .select()
    .from(orders)
    .where(inArray(orders.id, orderIds));

  const orderPromises = results.map((order) => {
    var updatedOrder = formattedOrders.find((o) => o.id == order.id);
    if (updatedOrder) {
      return db
        .update(orders)
        .set({
          updatedAt: updatedOrder.updatedAt,
          customerName: updatedOrder.customerName
        })
        .where(eq(orders.id, order.id));
    }
  });
  await Promise.all(orderPromises);

  // save unstored orders
  await db.insert(orders).values(formattedOrders).onConflictDoNothing();

  // save new order_products
  const formattedOrdersProducts = [
    ...distOrderProducts,
    ...flamOrderProducts,
    ...glitchOrderProducts
  ];

  const deletedResults = await db
    .delete(orders_products)
    .where(inArray(orders_products.orderId, orderIds));
  const addOrdersProductsResults = await db
    .insert(orders_products)
    .values(formattedOrdersProducts);

  return 'Orders saved!';
}

export default saveOrdersFromOrdermentumCommand;

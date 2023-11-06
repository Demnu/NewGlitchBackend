import { Request, Response, Router } from 'express';
import { ordermentumClient } from '../../../ordermentumConnection';
import { db } from '../../../dbConnection';
import { eq, inArray, sql } from 'drizzle-orm';
import { Order, orders } from '../../../Domain/Entities/orders';
import {
  OrderFromOrdermentumType,
  OrderExtended,
  readOrders
} from '../../../Utilities/Ordermentum/formatOrdersFromOrdermentum';
import { orders_products } from '../../../Domain/Entities/orders_products';
import { Product, products } from '../../../Domain/Entities/products';
import { readProductsFromFormattedOrders } from '../../../Utilities/Ordermentum/readAndSaveProducts';
import { saveOrdersAndProductsToMongo } from '../../../Legacy/saveOrdersAndProductsToMongo';
import { createLog } from '../../../Utilities/Logs/makeLog';
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

export async function getOrdersFromOrdermentum(): Promise<string[]> {
  // download orders using ordermentum api
  const downloadedOrders = await downloadOrdersFromOrdermentum();
  // format downloaded orders for database consumption
  const formattedOrders = formatOrdersFromOrdermentum(downloadedOrders);

  // legacy remove when migrated to new backend
  // **************************************************
  await saveOrdersAndProductsToMongo(formattedOrders);
  // **************************************************

  // save products from orders to database
  const formattedProductsFromOrdersForDatabase =
    readProductsFromFormattedOrders(formattedOrders);

  formattedProductsFromOrdersForDatabase.forEach((product) => {
    addProductFromOrderToDatabase(product);
  });

  // add orders to database
  formattedOrders.forEach((order) => {
    addOrderToDatabase(order);
  });

  const orderIds = formattedOrders.map((formattedOrder) => formattedOrder.id);

  return orderIds;
}

const addProductFromOrderToDatabase = async (productFromOrder: Product) => {
  try {
    await db.insert(products).values(productFromOrder).onConflictDoNothing();
  } catch (error) {
    console.error(`Error saving product`, error);
    console.log(`${productFromOrder.id} - ${productFromOrder.productName}`);
  }
};

const addOrderToDatabase = async (order: OrderExtended) => {
  try {
    await db.transaction(async (tx) => {
      const orderForDatabase: Order = { ...order };
      const result = await tx
        .insert(orders)
        .values(orderForDatabase)
        .returning({ insertedId: orders.id })
        .onConflictDoUpdate({
          target: orders.id,
          set: {
            updatedAt: sql`EXCLUDED."updated_at"`,
            invoiceNumber: sql`EXCLUDED."invoice_number"`
          }
        });

      const orderProducts = order.orderProducts.map((product) => ({
        ...product,
        orderId: result[0].insertedId
      }));

      if (orderProducts.length > 0) {
        // delete old order_products
        await tx
          .delete(orders_products)
          .where(eq(orders_products.orderId, result[0].insertedId));

        // add new order_products
        await tx.insert(orders_products).values(orderProducts);
      } else {
        tx.rollback();
        const errorMessage = `Order has no order_products`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
    });
  } catch (error) {
    console.error(
      `Error saving order:: ${order.id}, ${order.customerName}, ${order.createdAt}, ${order.updatedAt}`,
      error
    );
  }
  createLog(
    'informational',
    `Orders successfully retreived from ordermentum and saved to database`,
    __filename
  );
};

interface DownloadedOrdermentumOrders {
  ordersFormatted: OrderFromOrdermentumType[];
  suppliedId: string | undefined;
}

const formatOrdersFromOrdermentum = (
  downloadedOrdersWithSupplierIds: DownloadedOrdermentumOrders[]
) => {
  const formattedOrders = downloadedOrdersWithSupplierIds.flatMap((orders) => {
    return readOrders(orders.ordersFormatted, orders.suppliedId);
  });

  return formattedOrders;
};

const downloadOrdersFromOrdermentum = async () => {
  // Set your custom pagination settings
  const customPagination = {
    pageSize: 40,
    pageNo: 1,
    filter: 'b0d7ba3e-4ab1-4c1b-85ec-1275cd6687b9'
  };

  const distSupplierID = process.env.DIST_SUPPLIER_ID;
  const flamSupplierId = process.env.FLAM_SUPPLIER_ID;
  const glitchSupplierId = process.env.GLITCH_SUPPLIER_ID;

  const data: DownloadedOrdermentumOrders[] = [];

  // Fetch products for each supplier with the custom pagination settings
  const distResults = await ordermentumClient.orders.findAll({
    ...customPagination,
    supplierId: distSupplierID
  });
  const flamResults = await ordermentumClient.orders.findAll({
    ...customPagination,
    supplierId: flamSupplierId
  });
  const glitchResults = await ordermentumClient.orders.findAll({
    ...customPagination,
    supplierId: glitchSupplierId
  });
  data.push(
    { ordersFormatted: distResults.data, suppliedId: distSupplierID },
    { ordersFormatted: flamResults.data, suppliedId: flamSupplierId },
    { ordersFormatted: glitchResults.data, suppliedId: glitchSupplierId }
  );
  return data;
};

const updateOrders = (formattedOrders: OrderExtended[]) => {
  // for updating Orders
  // const results = await db
  //   .select()
  //   .from(orders)
  //   .where(inArray(orders.id, orderIds));
  // // this isnt fully working now
  // const orderPromises = results.map((order) => {
  //   var updatedOrder = formattedOrders.find((o) => o.id == order.id);
  //   if (updatedOrder) {
  //     return db
  //       .update(orders)
  //       .set({
  //         updatedAt: updatedOrder.updatedAt,
  //         customerName: updatedOrder.customerName
  //       })
  //       .where(eq(orders.id, order.id));
  //   }
  // });
  // await Promise.all(orderPromises);
  // save unstored orders
};

export { saveOrdersFromOrdermentumCommand };

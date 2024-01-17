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
    createLog(
      'critical',
      `Critical! Could not fetch orders from ordermentum. Error: ${error}`,
      __filename
    );
    res.status(500).send('Failed to get orders from Ordermentum');
  }
};

export async function getOrdersFromOrdermentum(): Promise<string[]> {
  try {
    // download orders using ordermentum api
    const downloadedOrders = await downloadOrdersFromOrdermentum();
    // format downloaded orders for database consumption

    const formattedOrders = formatOrdersFromOrdermentum(downloadedOrders);

    // filter orders, should move into downloadOrdersFromOrdermentum at some point
    let ordersDb: { id: string }[] = [];
    if (formattedOrders.length > 0) {
      ordersDb = await db.query.orders.findMany({
        columns: { id: true },
        where: inArray(
          orders.id,
          formattedOrders.map((o) => o.id)
        )
      });
    }
    const filteredOrders = formattedOrders.filter(
      (o) => !ordersDb.some((od) => od.id === o.id)
    );

    // save products from orders to database
    let productsDb: { id: string }[] = [];
    const formattedProductsFromOrdersForDatabase =
      readProductsFromFormattedOrders(filteredOrders);
    const filteredProducts = formattedProductsFromOrdersForDatabase.filter(
      (p) => !productsDb.some((pd) => pd.id === p.id)
    );

    if (filteredProducts.length > 0) {
      productsDb = await db.query.products.findMany({
        columns: { id: true },
        where: inArray(
          products.id,
          formattedProductsFromOrdersForDatabase.map((p) => p.id)
        )
      });
    }

    // try to add each product
    for (let product of filteredProducts) {
      await addProductFromOrderToDatabase(product);
    }

    createLog(
      'informational',
      `Success!  Saving orders from Ordermentum: [${filteredOrders
        .map((o) => o.invoiceNumber)
        .join(', ')}]`,
      __filename
    );
    // add orders to database
    filteredOrders.forEach((order) => {
      addOrderToDatabase(order);
    });

    // legacy remove when migrated to new backend
    // **************************************************
    if (process.env.ENVIRONMENT != 'local') {
      try {
        await saveOrdersAndProductsToMongo(formattedOrders, filteredProducts);
      } catch (error) {
        throw new Error(
          `Error saving orders and products to mongo. Error: ${error}`
        );
      }
    }
    // **************************************************

    const orderIds = filteredOrders.map((formattedOrder) => formattedOrder.id);

    return orderIds;
  } catch (error) {
    createLog(
      'critical',
      `Critical! Could not fetch orders from ordermentum. Error: ${error}`,
      __filename
    );
    throw error;
  }
}

const addProductFromOrderToDatabase = async (productFromOrder: Product) => {
  try {
    await db.insert(products).values(productFromOrder).onConflictDoNothing();
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Error saving product ${productFromOrder.productName}: ${errorMsg}`
    );
  }
};

// Function to generate a random negative number
function generateRandomNegativeNumber() {
  return -Math.floor(Math.random() * 10000000); // Adjust the range as needed
}

const addOrderToDatabase = async (order: OrderExtended) => {
  // Check if order has a null invoice number; this will be rare. I am not sure why this occurs.
  if (order.invoiceNumber === null || order.invoiceNumber === undefined) {
    // Assign a random negative number to invoiceNumber
    console.log('Added invoice number');
    order.invoiceNumber = generateRandomNegativeNumber().toString();
  }
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
        const errMsg = `Error! Order: ${order.invoiceNumber} has no products associated with it. Order was not saved.`;
        createLog('warning', errMsg, __filename);
        tx.rollback();
        throw new Error(errMsg);
      }
    });
  } catch (error) {
    let errorMsg = error instanceof Error ? error.message : String(error);
    errorMsg = `Error saving order: ${order.id}, ${order.customerName}, ${order.createdAt}, ${order.updatedAt}. Error: ${errorMsg}`;

    throw new Error(errorMsg);
  }
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
    pageSize: 25,
    pageNo: 1,
    filter: 'b0d7ba3e-4ab1-4c1b-85ec-1275cd6687b9'
  };

  const distSupplierID = process.env.DIST_SUPPLIER_ID;
  const flamSupplierId = process.env.FLAM_SUPPLIER_ID;
  const glitchSupplierId = process.env.GLITCH_SUPPLIER_ID;
  const peaSupplierId = process.env.PEA_SUPPLIER_ID;

  const data: DownloadedOrdermentumOrders[] = [];

  try {
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
    const peaResults = await ordermentumClient.orders.findAll({
      ...customPagination,
      supplierId: peaSupplierId
    });
    data.push(
      { ordersFormatted: distResults.data, suppliedId: distSupplierID },
      { ordersFormatted: flamResults.data, suppliedId: flamSupplierId },
      { ordersFormatted: glitchResults.data, suppliedId: glitchSupplierId },
      {
        ordersFormatted: peaResults.data,
        suppliedId: peaSupplierId
      }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Critical! Could not fetch orders from ordermentum. Error: ${errorMsg}`
    );
  }

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

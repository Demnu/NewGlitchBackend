import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import drizzleConfig, { migrationConfig } from '../drizzle.config';
import databaseClient from './dbConnection';
import { Product, products } from './db/schema/products';
import { recipes } from './db/schema/recipes';
import { OrdermentumClient } from './ordermentumConnection';
import { readOrders } from './utils/readAndSaveOrders';
import { orders } from './db/schema/orders';
import { eq, inArray } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/pg-core';

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

const db = drizzle(databaseClient, { schema: { products, recipes, orders } });
const ordermentumClient = OrdermentumClient;

const startServer = async () => {
  try {
    const result = await db.query.products.findFirst();
    console.log(`server is running on PORT ${PORT}`);
    app.listen(PORT, () => {});
  } catch (error) {
    console.error('Cannot start the server without a database connection.');
  }
};

startServer();

// app.get('/getCountries', async (req: Request, res: Response) => {
//   const result = await  db.query.countries.findMany();
//   res.send(result);
// });

app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running');
});

app.get('/getProductsFromOrdermentum', async (req: Request, res: Response) => {
  // Set your custom pagination settings
  const customPagination = { pageSize: 500, pageNo: 1 };

  // Fetch products for each supplier with the custom pagination settings
  const distResults = await ordermentumClient.products.findAll({
    ...customPagination,
    supplierId: process.env.DIST_SUPPLIER_ID
  });
  const flamResults = await ordermentumClient.products.findAll({
    ...customPagination,
    supplierId: process.env.FLAM_SUPPLIER_ID
  });
  const glitchResults = await ordermentumClient.products.findAll({
    ...customPagination,
    supplierId: process.env.GLITCH_SUPPLIER_ID
  });
  res.send('Hello');
});

app.get('/getOrdersFromOrdermentum', async (req: Request, res: Response) => {
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

  let formattedOrders = readOrders(
    distResults.data,
    process.env.DIST_SUPPLIER_ID
  );
  formattedOrders = [...formattedOrders, ...readOrders(flamResults.data, process.env.FLAM_SUPPLIER_ID)]
  formattedOrders = [...formattedOrders, ...readOrders(glitchResults.data, process.env.GLITCH_SUPPLIER_ID)]

  // update saved orders
  const orderIds = formattedOrders.map(
    (formattedOrder) => formattedOrder.orderId
  );

  const results = await db
    .select()
    .from(orders)
    .where(inArray(orders.orderId, orderIds));


  const promises = results.map((order) => {
    var updatedOrder = formattedOrders.find((o) => o.orderId == order.orderId);
    if (updatedOrder) {
      return db
        .update(orders)
        .set({ updatedAt: updatedOrder.updatedAt, customerName:updatedOrder.customerName })
        .where(eq(orders.orderId, order.orderId));
    }
  });
  await Promise.all(promises);

  // save unstored orders
  await db.insert(orders)
  .values(formattedOrders)
  .onConflictDoNothing();
 
  res.send('Hello');
});

app.get('/applyMigrations', async (req: Request, res: Response) => {
  try {
    const migrationClient = postgres(process.env.CONNECTION_STRING || '', {
      max: 1
    });
    await migrate(drizzle(migrationClient), migrationConfig);
    res.send('Migration successfull');
  } catch (error) {
    console.log(error);
    res.send('Migration unsuccessfull');
  }
});

app.get('/saveProductsToDB', async (req: Request, res: Response) => {
  try {
    const product: Product = { productName: 'test' };
    const result = await db.insert(products).values(product);
    res.send('Product added');
  } catch (error) {
    res.send('Products not added');
  }
});

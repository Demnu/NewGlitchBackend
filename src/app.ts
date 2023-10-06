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
import { Order, orderRelations, orders } from './db/schema/orders';
import { eq, inArray } from 'drizzle-orm';
import { readProducts } from './utils/readAndSaveProducts';
import {
  ordersProductsRelations,
  orders_products
} from './db/schema/orders_products';

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

const db = drizzle(databaseClient, {
  schema: {
    products,
    recipes,
    orders,
    orders_products,
    orderRelations,
    ordersProductsRelations
  }
});
const ordermentumClient = OrdermentumClient;

const startServer = async () => {
  try {
    const result = await db.query.orders.findFirst();
    console.log(`server is running on PORT ${PORT}`);
    app.listen(PORT, () => {});
  } catch (error) {
    console.log(error);
    console.error('Cannot start the server without a database connection.');
  }
};

startServer();

// Schedule the tasks to run every 10 minutesxw
setInterval(
  async () => {
    try {
      await getProductsFromOrdermentum();
      console.log('Products fetched and saved successfully.');
    } catch (error) {
      console.error('Failed to fetch and save products:', error);
    }

    try {
      await getOrdersFromOrdermentum();
      console.log('Orders fetched and saved successfully.');
    } catch (error) {
      console.error('Failed to fetch and save orders:', error);
    }
  },
  10 * 60 * 1000
); // 10 minutes in milliseconds

app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running');
});

interface OrderDto{
  orderId?: string
  customerName?: string | null
  products?: Product[]
} 

app.get('/getOrders', async (req: Request, res: Response) => {
  // const result = await db.query.orders_products.findMany({with:{order:'true'}})
  const results = await db.query.orders.findMany({
    with: {
      order_products: { with: { product: true } }
    }
  });


  var orderDtos: OrderDto[]  = results.map((result)=>{
    var orderDto: OrderDto = {orderId: result.id, customerName: result.customerName }
    var products: Product[] = result.order_products.map(op => op.product).filter(product => product !== null) as Product[];
    orderDto.products = products
    return (orderDto)
  })
  res.send(orderDtos);
});

app.get('/getProductsFromOrdermentum', async (req: Request, res: Response) => {
  try {
    const result = await getProductsFromOrdermentum();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Failed to get products from Ordermentum');
  }
});

app.get('/getOrdersFromOrdermentum', async (req: Request, res: Response) => {
  try {
    const result = await getOrdersFromOrdermentum();
    res.send(result);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Failed to get orders from Ordermentum');
  }
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

async function getProductsFromOrdermentum(): Promise<string> {
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

  let formattedProducts = readProducts(distResults.data);
  formattedProducts = [...formattedProducts, ...readProducts(flamResults.data)];
  formattedProducts = [
    ...formattedProducts,
    ...readProducts(glitchResults.data)
  ];

  // update saved orders
  const productIds = formattedProducts.map(
    (formattedProduct) => formattedProduct.id
  );

  const results = await db
    .select()
    .from(products)
    .where(inArray(products.id, productIds));

  const promises = results.map((product) => {
    var updatedProduct = formattedProducts.find(
      (p) => p.id == product.id
    );
    if (updatedProduct) {
      return db
        .update(products)
        .set({
          productName: updatedProduct.productName,
          sku: updatedProduct.sku,
          price: updatedProduct.price,
          possiblyCoffee: updatedProduct.possiblyCoffee
        })
        .where(eq(products.id, product.id));
    }
  });
  await Promise.all(promises);

  // save unstored orders
  await db.insert(products).values(formattedProducts).onConflictDoNothing();
  return 'Products saved!';
}

async function getOrdersFromOrdermentum(): Promise<string> {
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
  const formattedOrders = [...distOrders, ...flamOrders, ...glitchOrders]

  const orderIds = formattedOrders.map(
    (formattedOrder) => formattedOrder.id
  );

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
  const formattedOrdersProducts = [...distOrderProducts, ...flamOrderProducts, ...glitchOrderProducts]

  const deletedResults = await db.delete(orders_products) .where(inArray(orders_products.orderId, orderIds));
  const addOrdersProductsResults = await db.insert(orders_products).values(formattedOrdersProducts)

  return 'Orders saved!';

}

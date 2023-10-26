import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { migrationConfig } from '../drizzle.config';
import ordermentumClient from './ordermentumConnection';
import { orders } from './Domain/Entities/orders';
import { eq, inArray } from 'drizzle-orm';
import { readProducts } from './Utilities/Ordermentum/readAndSaveProducts';
import { orders_products } from './Domain/Entities/orders_products';
import { products } from './Domain/Entities/products';
import ordersController from './Controllers/ordersController';
import ordermentumController from './Controllers/ordermentumController';

import db from './dbConnection';
import { getProductsFromOrdermentum } from './CQRS/Ordermentum/Commands/saveProductsFromOrdermentumCommand';
import { getOrdersFromOrdermentum } from './CQRS/Ordermentum/Commands/saveOrdersFromOrdermentumCommand';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const path = require('path');

const app: Application = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use('/orders', ordersController);
app.use('/ordermentum', ordermentumController);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

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

app.get('/', (req, res) => {
  res.render('welcome');
});

app.get('/applyMigrations', async (req: Request, res: Response) => {
  // #swagger.tags = ['Orders']
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

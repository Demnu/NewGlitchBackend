import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { migrationConfig } from '../drizzle.config';
import ordersRoutes from './Routes/ordersRoutes';
import recipeRoutes from './Routes/recipeRoutes';
import calculationsRoutes from './Routes/calculationsRoutes';
import beansRoutes from './Routes/beansRoutes';
import ordermentumController from './Controllers/ordermentumController';
import logsRoutes from './Routes/logsRoutes';
import { errorHandler } from './Middlewares/errorHandler';
import cors from 'cors';
import { performScheduledTasks } from './Utilities/performScheduledTasks';
import { requestLoggerMiddleware } from './Middlewares/requestLoggerMiddleware';
import { getRecipesFromMongo } from './Legacy/getRecipesFromMongo';

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const path = require('path');
const app: Application = express();

const allowedOrigins = ['http://localhost:5173', 'http://170.64.169.119:5173'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/applyMigrations', async (req: Request, res: Response) => {
  // #swagger.ignore = true
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
app.get('/', async (req, res) => {
  /*
    #swagger.ignore = true
  */
  // await getRecipesFromMongo();
  res.render('welcome');
});
app.post('/getRecipesFromMongo', async (req, res) => {
  /*
    #swagger.ignore = true
  */
  await getRecipesFromMongo();
  res.render('welcome');
});
app.use(
  '/logs',
  logsRoutes
  /*
    #swagger.tags = ['Logs']
  */
);

// any endpoint past here will get logged
app.use(requestLoggerMiddleware);
app.use(
  '/orders',
  ordersRoutes
  /*
    #swagger.tags = ['Orders']
  */
);
app.use('/ordermentum', ordermentumController);
app.use(
  '/recipes',
  recipeRoutes
  /*
    #swagger.tags = ['Recipes']
  */
);
app.use(
  '/calculations',
  calculationsRoutes
  /*
    #swagger.tags = ['Calculations']
  */
);
app.use(
  '/beans',
  beansRoutes
  /*
    #swagger.tags = ['Beans']
  */
);

app.use(errorHandler);
const PORT = process.env.PORT;

const startServer = async () => {
  try {
    console.log(`server is running on PORT ${PORT}`);
    app.listen(PORT, () => {});
  } catch (error) {
    console.log(error);
    console.error('Cannot start the server without a database connection.');
  }
};

startServer();
performScheduledTasks();
// run scheduled tasks every 10 minutes
setInterval(performScheduledTasks, 10 * 60 * 1000);

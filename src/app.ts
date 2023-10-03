import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import drizzleConfig, { migrationConfig } from '../drizzle.config';
import { countries } from './db/schema/countries';
import { cities } from './db/schema/cities';
import client from './dbConnection';
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;



const db = drizzle(client, { schema:{countries,cities} });

const startServer = async () => {
  try {
    const result = await db.query.countries.findFirst();
    console.log(`server is running on PORT ${PORT}`);
    app.listen(PORT, () => {
      
    });
    
  } catch (error) {
    console.error('Cannot start the server without a database connection.');
    
  }
};

startServer();



app.get('/getCountries', async (req: Request, res: Response) => {
  const result = await  db.query.countries.findMany();
  res.send(result);
});

app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running');
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


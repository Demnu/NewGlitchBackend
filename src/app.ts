import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { Pool } from 'pg';
import drizzleConfig, { migrationConfig } from '../drizzle.config';
import { env } from 'process';
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});



app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running');
})

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

app.get('/testdb', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as now');
    const currentTime = result.rows[0].now;
    client.release();
    res.send(`Database connected! Current time: ${currentTime}`);
  } catch (err) {
    console.error(err);
    res.send('Error connecting to the database');
  }
});

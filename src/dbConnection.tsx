import postgres from 'postgres';
import { products } from './Domain/Entities/products';
import { recipes } from './Domain/Entities/recipes';
import { orders, orderRelations } from './Domain/Entities/orders';
import { orders_products } from './Domain/Entities/orders_products';
import { ordersProductsRelations } from './Domain/Entities/orders_products';
import { drizzle } from 'drizzle-orm/postgres-js';

console.log('in here');
const databaseClient = postgres(process.env.CONNECTION_STRING || '', {
  max: 1
});

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
export default db;

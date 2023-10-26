import postgres from 'postgres';
import { products } from './Domain/Entities/products';
import { beans, beansRelations } from './Domain/Entities/beans';
import { recipes, recipesRelations } from './Domain/Entities/recipes';
import { orders, orderRelations } from './Domain/Entities/orders';
import { orders_products } from './Domain/Entities/orders_products';
import { ordersProductsRelations } from './Domain/Entities/orders_products';
import { drizzle } from 'drizzle-orm/postgres-js';

const databaseClient = postgres(process.env.CONNECTION_STRING || '', {
  max: 1
});

const db = drizzle(databaseClient, {
  schema: {
    beans,
    beansRelations,
    products,
    recipes,
    recipesRelations,
    orders,
    orders_products,
    orderRelations,
    ordersProductsRelations
  }
});
export default db;

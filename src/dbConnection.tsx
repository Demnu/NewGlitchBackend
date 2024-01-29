import postgres from 'postgres';
import { products, productRelations } from './Domain/Entities/products';
import { beans, beansRelations } from './Domain/Entities/beans';
import { blends, blendsRelations } from './Domain/Entities/blends';
import { logs } from './Domain/Entities/logs';
import { recipes, recipesRelations } from './Domain/Entities/recipes';
import { orders, orderRelations } from './Domain/Entities/orders';
import { orders_products } from './Domain/Entities/orders_products';
import { calculations } from './Domain/Entities/calculations';
import { ordersProductsRelations } from './Domain/Entities/orders_products';
import { drizzle } from 'drizzle-orm/postgres-js';
import {
  recipe_beans,
  recipeBeansRelations
} from './Domain/Entities/recipe_beans';

const databaseClient = postgres(process.env.CONNECTION_STRING || '', {
  max: 1
});

const db = drizzle(databaseClient, {
  schema: {
    beans,
    beansRelations,
    products,
    productRelations,
    recipes,
    recipesRelations,
    recipe_beans,
    recipeBeansRelations,
    orders,
    orders_products,
    orderRelations,
    ordersProductsRelations,
    logs,
    calculations,
    blends,
    blendsRelations
  }
});
export { db };

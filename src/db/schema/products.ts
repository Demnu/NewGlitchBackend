import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  doublePrecision,
  boolean
} from 'drizzle-orm/pg-core';
import { orders_products } from './orders_products';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productId: varchar('product_id', { length: 256 }).unique().notNull(),
  productName: varchar('product_name', { length: 256 }).notNull(),
  sku: varchar('sku', { length: 256 }),
  price: doublePrecision('price'),
  possiblyCoffee: boolean('possibly_coffee').notNull()
});

export const orderRelations = relations(products, ({ many }) => ({
	order_products: many(orders_products),
}));

export type Product = typeof products.$inferInsert;

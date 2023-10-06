import {
  pgTable,
  serial,
  integer,
  varchar,
  doublePrecision,
  boolean
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productId: varchar('product_id', { length: 256 }).unique().notNull(),
  productName: varchar('product_name', { length: 256 }).notNull(),
  sku: varchar('sku', { length: 256 }),
  price: doublePrecision('price'),
  possiblyCoffee: boolean('possibly_coffee').notNull()
});

export type Product = typeof products.$inferInsert;

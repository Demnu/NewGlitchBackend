import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productName: varchar('product_name', { length: 256 })
});

export type Product = typeof products.$inferInsert;

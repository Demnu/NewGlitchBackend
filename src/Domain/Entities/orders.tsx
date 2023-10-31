import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { orders_products } from './orders_products';
import { relations } from 'drizzle-orm';

export const orders = pgTable('orders', {
  id: varchar('id').primaryKey().notNull(),
  customerName: varchar('customer_name', { length: 256 }),
  supplierName: varchar('supplier_name', { length: 256 }),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'string',
    withTimezone: true
  })
});

export const orderRelations = relations(orders, ({ many }) => ({
  order_products: many(orders_products)
}));

export type Order = typeof orders.$inferInsert;

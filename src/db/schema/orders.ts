import {
  pgTable,
  serial,
  timestamp,
  integer,
  varchar,
  date
} from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey().notNull(),
  orderId: varchar('orderId').unique().notNull(),
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

export type Order = typeof orders.$inferInsert;

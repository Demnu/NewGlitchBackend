import { pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { orders_products } from './orders_products';
import { relations } from 'drizzle-orm';

const orderStatusEnum = pgEnum('order_status', ['notCalculated', 'calculated']);

const orders = pgTable('orders', {
  id: varchar('id').primaryKey().notNull(),
  customerName: varchar('customer_name', { length: 256 }).notNull(),
  supplierName: varchar('supplier_name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'string',
    withTimezone: true
  }).notNull(),
  orderStatus: orderStatusEnum('order_status').notNull(),
  invoiceNumber: varchar('invoice_number', { length: 256 })
});

const orderRelations = relations(orders, ({ many }) => ({
  order_products: many(orders_products)
}));

type Order = typeof orders.$inferInsert;
type OrderStatusEnum = typeof orders.$inferSelect.orderStatus;
export { orderStatusEnum, orders, orderRelations, Order, OrderStatusEnum };

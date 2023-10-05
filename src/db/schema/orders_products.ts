import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { products } from './products';

export const orders_products = pgTable('orders_products', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id),
  productId: integer('product_id').references(() => products.id),
  supplierName: varchar('supplier_name', { length: 256 })
});

export type Order_Products = typeof orders_products.$inferInsert;

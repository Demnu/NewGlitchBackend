import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { products } from './products';
import { relations } from 'drizzle-orm';

export const orders_products = pgTable('orders_products', {
  id: serial('id').primaryKey(),
  orderId: varchar('order_id')
    .references(() => orders.id)
    .notNull(),
  productId: varchar('product_id')
    .references(() => products.id)
    .notNull(),
  amountOrdered: integer('amount_ordered').notNull()
});

export const ordersProductsRelations = relations(
  orders_products,
  ({ one }) => ({
    order: one(orders, {
      fields: [orders_products.orderId],
      references: [orders.id]
    }),
    product: one(products, {
      fields: [orders_products.productId],
      references: [products.id]
    })
  })
);

export type Order_Products = typeof orders_products.$inferInsert;

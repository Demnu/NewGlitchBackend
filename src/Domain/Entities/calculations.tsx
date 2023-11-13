import { json, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { recipe_beans } from './recipe_beans';
import { relations } from 'drizzle-orm';

const calculations = pgTable('calculations', {
  id: serial('id').primaryKey(),
  author: varchar('author', { length: 256 }).notNull(),
  calculationName: varchar('calculationName', { length: 256 }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).notNull(),
  beansTally: json('beans_tally').notNull(),
  productsTally: json('products_tally').notNull(),
  ordersCalculatedInfo: json('orders_calculated_info').notNull()
});

type Calculation = typeof calculations.$inferInsert;

export { calculations, Calculation };

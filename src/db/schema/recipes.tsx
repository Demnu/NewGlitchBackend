import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  recipeName: varchar('product_name', { length: 256 })
});

export type Recipe = typeof recipes.$inferInsert;

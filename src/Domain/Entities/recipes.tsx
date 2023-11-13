import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';
import { products } from './products';
import { relations } from 'drizzle-orm';
import { recipe_beans } from './recipe_beans';

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  productId: varchar('product_id')
    .references(() => products.id)
    .notNull(),
  recipeName: varchar('product_name', { length: 256 }).notNull(),
  blendName: varchar('blend_name', { length: 256 })
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  products: one(products, {
    fields: [recipes.recipeName],
    references: [products.productName]
  }),
  recipe_beans: many(recipe_beans)
}));
export type Recipe = typeof recipes.$inferInsert;

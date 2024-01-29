import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';
import { products } from './products';
import { relations } from 'drizzle-orm';
import { recipe_beans } from './recipe_beans';
import { blends } from './blends';
export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  productId: varchar('product_id')
    .references(() => products.id)
    .notNull(),
  recipeName: varchar('product_name', { length: 256 }).notNull(),
  blendId: integer('blend_id').references(() => blends.id)
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  products: one(products, {
    fields: [recipes.recipeName],
    references: [products.productName]
  }),
  recipe_beans: many(recipe_beans),
  blends: one(blends, { fields: [recipes.blendId], references: [blends.id] })
}));

export type Recipe = typeof recipes.$inferInsert;

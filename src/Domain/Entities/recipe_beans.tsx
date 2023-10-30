import { pgTable, serial, integer, doublePrecision } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { recipes } from './recipes';
import { beans } from './beans';
export const recipe_beans = pgTable('recipe_beans', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').references(() => recipes.id),
  beanId: integer('bean_id').references(() => beans.id),
  amountOrdered: doublePrecision('amount_ordered').notNull()
});
export const recipeBeansRelations = relations(recipe_beans, ({ one }) => ({
  recipes: one(recipes, {
    fields: [recipe_beans.recipeId],
    references: [recipes.id]
  }),
  bean: one(beans, {
    fields: [recipe_beans.beanId],
    references: [beans.id]
  })
}));
export type Recipe_Beans = typeof recipe_beans.$inferInsert;

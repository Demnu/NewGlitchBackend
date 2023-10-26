import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { recipe_beans } from './recipe_beans';
import { relations } from 'drizzle-orm';

export const beans = pgTable('beans', {
  id: serial('id').primaryKey(),
  beanName: varchar('bean_name', { length: 256 })
});

export const beansRelations = relations(beans, ({ many }) => ({
  recipe_beans: many(recipe_beans)
}));
export type Bean = typeof beans.$inferInsert;

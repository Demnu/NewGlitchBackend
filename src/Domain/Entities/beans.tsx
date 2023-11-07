import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { recipe_beans } from './recipe_beans';
import { relations } from 'drizzle-orm';

const beans = pgTable('beans', {
  id: serial('id').primaryKey(),
  beanName: varchar('bean_name', { length: 256 }).notNull().unique()
});

const beansRelations = relations(beans, ({ many }) => ({
  recipe_beans: many(recipe_beans)
}));

const BeanJsonSchema = {
  $id: 12345,
  $beanName: 'Popoyan'
};
export type Bean = typeof beans.$inferInsert;

export { beans, beansRelations, BeanJsonSchema };

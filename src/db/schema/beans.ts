import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const beans = pgTable('beans', {
  id: serial('id').primaryKey(),
  beanName: varchar('bean_name', { length: 256 })
});

export type Bean = typeof beans.$inferInsert;

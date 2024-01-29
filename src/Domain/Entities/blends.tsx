import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { recipes } from './recipes';

const blends = pgTable('blends', {
  id: serial('id').primaryKey(),
  blendName: varchar('blend_name', { length: 256 }).notNull()
});

const blendsRelations = relations(blends, ({ many }) => ({
  recipes: many(recipes)
}));

type Blend = typeof blends.$inferInsert;

export { blends, Blend, blendsRelations };

import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const blends = pgTable('blends', {
  id: serial('id').primaryKey(),
  blendName: varchar('blend_name', { length: 256 }).notNull()
});

export type Blend = typeof blends.$inferInsert;

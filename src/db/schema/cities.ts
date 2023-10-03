import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';
import { countries } from './countries';

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  countryId: integer('country_id').references(() => countries.id)
});

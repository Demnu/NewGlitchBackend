import {
  pgEnum,
  pgTable,
  serial,
  varchar,
  timestamp
} from 'drizzle-orm/pg-core';
import { recipe_beans } from './recipe_beans';
import { relations } from 'drizzle-orm';

const logLevelEnum = pgEnum('log_level', [
  'emergency',
  'alert',
  'critical',
  'error',
  'warning',
  'notice',
  'informational',
  'debug'
]);

const logs = pgTable('logs', {
  id: serial('id').primaryKey(),
  logLevel: logLevelEnum('log_level').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).notNull(),
  message: varchar('message', { length: 256 }).notNull(),
  sourceFile: varchar('source_file', { length: 256 }).notNull()
});

type Log = typeof logs.$inferInsert;
type LogLevelEnum = typeof logs.$inferSelect.logLevel;

export { logLevelEnum, logs, Log, LogLevelEnum };

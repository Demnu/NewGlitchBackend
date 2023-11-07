import {
  pgEnum,
  pgTable,
  serial,
  varchar,
  timestamp
} from 'drizzle-orm/pg-core';

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
  message: varchar('message', { length: 1000 }).notNull(),
  sourceFile: varchar('source_file', { length: 400 }).notNull()
});

type Log = typeof logs.$inferInsert;
type LogLevelEnum = typeof logs.$inferSelect.logLevel;

export { logLevelEnum, logs, Log, LogLevelEnum };

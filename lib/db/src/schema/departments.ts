import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { doctors } from './doctors';

export const departments = pgTable('departments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  location: varchar('location', { length: 100 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  doctors: many(doctors)
}));

export type DepartmentSelect = typeof departments.$inferSelect;
export type DepartmentInsert = typeof departments.$inferInsert;
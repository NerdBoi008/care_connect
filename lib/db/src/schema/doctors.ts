import { pgTable, uuid, varchar, integer, decimal, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { departments } from './departments';
import { appointments } from './appointments';
import { doctorAvailability } from './doctor-availability';

export const doctors = pgTable('doctors', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).unique(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  departmentId: uuid('department_id').references(() => departments.id),
  specialization: varchar('specialization', { length: 100 }).notNull(),
  qualification: varchar('qualification', { length: 255 }),
  experienceYears: integer('experience_years'),
  phone: varchar('phone', { length: 20 }),
  consultationFee: decimal('consultation_fee', { precision: 10, scale: 2 }),
  bio: text('bio'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const doctorsRelations = relations(doctors, ({ one, many }) => ({
  user: one(users, {
    fields: [doctors.userId],
    references: [users.id]
  }),
  department: one(departments, {
    fields: [doctors.departmentId],
    references: [departments.id]
  }),
  appointments: many(appointments),
  availability: many(doctorAvailability)
}));

export type DoctorSelect = typeof doctors.$inferSelect;
export type DoctorInsert = typeof doctors.$inferInsert;
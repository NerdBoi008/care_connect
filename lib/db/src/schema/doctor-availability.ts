import { pgTable, uuid, integer, time, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { doctors } from './doctors';

export const doctorAvailability = pgTable('doctor_availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  doctorId: uuid('doctor_id').references(() => doctors.id, { onDelete: 'cascade' }).notNull(),
  dayOfWeek: integer('day_of_week').notNull(), // 0=Sunday, 6=Saturday
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  slotDuration: integer('slot_duration').default(30), // minutes
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const doctorAvailabilityRelations = relations(doctorAvailability, ({ one }) => ({
  doctor: one(doctors, {
    fields: [doctorAvailability.doctorId],
    references: [doctors.id]
  })
}));

import { pgTable, uuid, date, time, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { patients } from './patients';
import { doctors } from './doctors';
import { users } from './users';
import { appointmentStatusEnum } from './enums';
import { medicalRecords } from './medical-records';

export const appointments = pgTable('appointments', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patient_id').references(() => patients.id, { onDelete: 'cascade' }).notNull(),
  doctorId: uuid('doctor_id').references(() => doctors.id, { onDelete: 'cascade' }).notNull(),
  appointmentDate: date('appointment_date').notNull(),
  appointmentTime: time('appointment_time').notNull(),
  duration: integer('duration').default(30), // minutes
  status: appointmentStatusEnum('status').default('pending').notNull(),
  reason: text('reason'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
  cancelledBy: uuid('cancelled_by').references(() => users.id)
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(patients, {
    fields: [appointments.patientId],
    references: [patients.id]
  }),
  doctor: one(doctors, {
    fields: [appointments.doctorId],
    references: [doctors.id]
  }),
  cancelledByUser: one(users, {
    fields: [appointments.cancelledBy],
    references: [users.id]
  }),
  medicalRecord: one(medicalRecords, {
    fields: [appointments.id],
    references: [medicalRecords.appointmentId]
  })
}));

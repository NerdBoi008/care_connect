import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { medicalRecords } from './medical-records';
import { patients } from './patients';
import { doctors } from './doctors';

export const prescriptions = pgTable('prescriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  medicalRecordId: uuid('medical_record_id').references(() => medicalRecords.id, { onDelete: 'cascade' }).notNull(),
  patientId: uuid('patient_id').references(() => patients.id, { onDelete: 'cascade' }).notNull(),
  doctorId: uuid('doctor_id').references(() => doctors.id),
  medicationName: varchar('medication_name', { length: 255 }).notNull(),
  dosage: varchar('dosage', { length: 100 }).notNull(),
  frequency: varchar('frequency', { length: 100 }).notNull(),
  duration: varchar('duration', { length: 100 }).notNull(),
  instructions: text('instructions'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const prescriptionsRelations = relations(prescriptions, ({ one }) => ({
  medicalRecord: one(medicalRecords, {
    fields: [prescriptions.medicalRecordId],
    references: [medicalRecords.id]
  }),
  patient: one(patients, {
    fields: [prescriptions.patientId],
    references: [patients.id]
  }),
  doctor: one(doctors, {
    fields: [prescriptions.doctorId],
    references: [doctors.id]
  })
}));

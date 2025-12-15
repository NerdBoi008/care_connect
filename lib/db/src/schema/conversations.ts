import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { patients } from './patients';
import { doctors } from './doctors';
import { messages } from './messages';

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  patientId: uuid('patient_id').references(() => patients.id, { onDelete: 'cascade' }).notNull(),
  doctorId: uuid('doctor_id').references(() => doctors.id, { onDelete: 'cascade' }).notNull(),
  lastMessageAt: timestamp('last_message_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  patient: one(patients, {
    fields: [conversations.patientId],
    references: [patients.id]
  }),
  doctor: one(doctors, {
    fields: [conversations.doctorId],
    references: [doctors.id]
  }),
  messages: many(messages)
}));

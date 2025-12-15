import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['patient', 'doctor', 'admin', 'staff']);
export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);
export const appointmentStatusEnum = pgEnum('appointment_status', [
  'pending',
  'confirmed',
  'cancelled',
  'completed',
  'no_show'
]);
export const paymentStatusEnum = pgEnum('payment_status', [
  'unpaid',
  'partial',
  'paid',
  'refunded'
]);
export const notificationTypeEnum = pgEnum('notification_type', [
  'appointment',
  'message',
  'prescription',
  'general'
]);

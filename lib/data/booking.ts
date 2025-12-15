import { doctors, departments, doctorAvailability } from '@/lib/db/src/schema';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db/src';

export async function getDoctorsForBooking() {
  const result = await db
    .select({
      id: doctors.id,
      name: doctors.firstName,
      lastName: doctors.lastName,
      specialization: doctors.specialization,
      departmentId: doctors.departmentId,
      consultationFee: doctors.consultationFee,
      experienceYears: doctors.experienceYears,
    })
    .from(doctors)
    .orderBy(doctors.firstName);

  return result.map((doc) => ({
    id: doc.id,
    name: `Dr. ${doc.name} ${doc.lastName}`,
    specialization: doc.specialization,
    departmentId: doc.departmentId || '',
    fee: parseFloat(doc.consultationFee || '0'),
    experience: doc.experienceYears || 0,
  }));
}

export async function getDepartments() {
  const result = await db
    .select({
      id: departments.id,
      name: departments.name,
    })
    .from(departments)
    .orderBy(departments.name);

  return result;
}

export async function getDoctorAvailability(doctorId: string, dayOfWeek: number) {
  const slots = await db
    .select()
    .from(doctorAvailability)
    .where(
      and(
        eq(doctorAvailability.doctorId, doctorId),
        eq(doctorAvailability.dayOfWeek, dayOfWeek),
        eq(doctorAvailability.isAvailable, true)
      )
    );

  return slots;
}

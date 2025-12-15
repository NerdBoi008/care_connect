import { db } from "@/lib/db/src/index";
import { doctors, departments } from '@/lib/db/src/schema';
import { eq, like, and, or, gte, lte, desc, asc } from 'drizzle-orm';

interface SearchParams {
  search?: string;
  specialization?: string;
  department?: string;
  experience?: string;
  fee?: string;
  availability?: string;
  sort?: string;
}

export async function getDoctors(params: SearchParams = {}) {
  const { search, specialization, department, experience, fee, sort } = params;

  // Build query conditions
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        like(doctors.firstName, `%${search}%`),
        like(doctors.lastName, `%${search}%`),
        like(doctors.specialization, `%${search}%`)
      )
    );
  }

  if (specialization) {
    conditions.push(eq(doctors.specialization, specialization));
  }

  if (department) {
    conditions.push(eq(doctors.departmentId, department));
  }

  if (experience) {
    const minExp = parseInt(experience);
    conditions.push(gte(doctors.experienceYears, minExp));
  }

  if (fee) {
    const maxFee = parseInt(fee);
    conditions.push(lte(doctors.consultationFee, maxFee.toString()));
  }

  // Execute query
  let query = db
    .select({
      id: doctors.id,
      firstName: doctors.firstName,
      lastName: doctors.lastName,
      specialization: doctors.specialization,
      qualification: doctors.qualification,
      experienceYears: doctors.experienceYears,
      consultationFee: doctors.consultationFee,
      bio: doctors.bio,
      phone: doctors.phone,
      department: {
        id: departments.id,
        name: departments.name,
      },
      userId: doctors.userId,
    })
    .from(doctors)
    .leftJoin(departments, eq(doctors.departmentId, departments.id))
    .where(and(...conditions));

  // Apply sorting
  if (sort === 'experience-desc') {
    query = query.orderBy(desc(doctors.experienceYears));
  } else if (sort === 'experience-asc') {
    query = query.orderBy(asc(doctors.experienceYears));
  } else if (sort === 'fee-asc') {
    query = query.orderBy(asc(doctors.consultationFee));
  } else if (sort === 'fee-desc') {
    query = query.orderBy(desc(doctors.consultationFee));
  } else {
    query = query.orderBy(asc(doctors.firstName));
  }

  const result = await query;

  // Transform data for client
  return result.map((doc) => ({
    id: doc.id,
    name: `Dr. ${doc.firstName} ${doc.lastName}`,
    firstName: doc.firstName,
    lastName: doc.lastName,
    specialization: doc.specialization,
    qualification: doc.qualification || 'MBBS',
    experience: doc.experienceYears || 0,
    fee: parseFloat(doc.consultationFee || '0'),
    bio: doc.bio || '',
    department: doc.department?.name || 'General',
    rating: 4.5 + Math.random() * 0.5, // Mock rating - add ratings table in production
    reviews: Math.floor(Math.random() * 300) + 50, // Mock reviews
    available: Math.random() > 0.3, // Mock availability - check doctorAvailability in production
  }));
}

export async function getDepartments() {
  const result = await db
    .select({
      id: departments.id,
      name: departments.name,
    })
    .from(departments)
    .orderBy(asc(departments.name));

  return result;
}

export async function getSpecializations() {
  const result = await db
    .selectDistinct({
      specialization: doctors.specialization,
    })
    .from(doctors)
    .orderBy(asc(doctors.specialization));

  return result.map((s) => s.specialization);
}

import { db } from '@/lib/db/src';
import { doctors, departments, } from '@/lib/db/src/schema';
import { eq } from 'drizzle-orm';

export async function getDoctorById(doctorId: string) {
  const result = await db
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
        location: departments.location,
      },
    })
    .from(doctors)
    .leftJoin(departments, eq(doctors.departmentId, departments.id))
    .where(eq(doctors.id, doctorId))
    .limit(1);

  if (!result[0]) return null;

  const doc = result[0];

  return {
    id: doc.id,
    name: `Dr. ${doc.firstName} ${doc.lastName}`,
    firstName: doc.firstName,
    lastName: doc.lastName,
    specialization: doc.specialization,
    qualification: doc.qualification || 'MBBS, MD',
    experience: doc.experienceYears || 0,
    fee: parseFloat(doc.consultationFee || '0'),
    bio: doc.bio || '',
    phone: doc.phone || '',
    department: doc.department?.name || 'General',
    departmentLocation: doc.department?.location || '',
    rating: 4.5 + Math.random() * 0.5, // Mock - add ratings table in production
    reviews: Math.floor(Math.random() * 300) + 50, // Mock
    languages: ['English', 'Hindi'], // Mock - add to schema in production
  };
}

export async function getDoctorReviews(doctorId: string) {
  // Mock reviews - in production, fetch from reviews table
  return [
    {
      id: '1',
      patientName: 'Rahul Sharma',
      rating: 5,
      comment: 'Excellent doctor! Very patient and thorough in explaining the diagnosis. Highly recommend.',
      date: new Date('2024-12-10'),
      verified: true,
    },
    {
      id: '2',
      patientName: 'Priya Patel',
      rating: 5,
      comment: 'Best experience ever. The doctor took time to understand my concerns and provided great care.',
      date: new Date('2024-12-05'),
      verified: true,
    },
    {
      id: '3',
      patientName: 'Amit Kumar',
      rating: 4,
      comment: 'Very knowledgeable and professional. Wait time was a bit long but worth it.',
      date: new Date('2024-11-28'),
      verified: true,
    },
  ];
}

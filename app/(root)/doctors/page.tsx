import { Suspense } from 'react';
import { DoctorsClient } from '@/components/doctors/doctors-client';
import { DoctorsSkeleton } from '@/components/doctors/doctors-skeleton';
import { getDoctors, getDepartments } from '@/lib/data/doctors';

export interface SearchParams {
  search?: string;
  specialization?: string;
  department?: string;
  experience?: string;
  fee?: string;
  availability?: string;
  sort?: string;
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Fetch data server-side
  const params = await searchParams;
  const [doctors, departments] = await Promise.all([
    getDoctors(params),
    getDepartments(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Doctor
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our {doctors.length}+ verified healthcare professionals
          </p>
        </div>
      </section>

      {/* Main Content */}
      <Suspense fallback={<DoctorsSkeleton />}>
        <DoctorsClient 
          initialDoctors={doctors} 
          departments={departments}
          searchParams={params}
        />
      </Suspense>
    </div>
  );
}

import { Suspense } from 'react';
import { getSpecializationsWithDoctors } from '@/lib/data/specializations';
import { SpecializationsClient } from '@/components/specializations/specializations-client';
import { SpecializationsSkeleton } from '@/components/specializations/specializations-skeleton';

export const metadata = {
  title: 'Medical Specializations | HealthCarePlus',
  description: 'Browse our medical specializations and find the right specialist for your health needs.',
};

export default async function SpecializationsPage() {
  const specializations = await getSpecializationsWithDoctors();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-br from-blue-50 to-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Medical Specializations
            </h1>
            <p className="text-lg text-gray-600">
              Explore our comprehensive range of medical specialties. 
              Find the right specialist for your specific health needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <Suspense fallback={<SpecializationsSkeleton />}>
        <SpecializationsClient specializations={specializations} />
      </Suspense>
    </div>
  );
}

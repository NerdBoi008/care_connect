import { Suspense } from 'react';
import { BookingForm } from '@/components/booking/booking-form';
import { getDoctorsForBooking, getDepartments } from '@/lib/data/booking';

export const metadata = {
  title: 'Book Appointment | HealthCarePlus',
  description: 'Schedule your appointment with our expert doctors',
};

export default async function BookAppointmentPage() {
  const [doctors, departments] = await Promise.all([
    getDoctorsForBooking(),
    getDepartments(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book an Appointment
            </h1>
            <p className="text-lg text-gray-600">
              Schedule your consultation in just a few simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <BookingForm doctors={doctors} departments={departments} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

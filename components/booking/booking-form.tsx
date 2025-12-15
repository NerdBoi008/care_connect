'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { StepIndicator } from './step-indicator';
import { DoctorSelectionStep } from './doctor-selection-step';
import { DateTimeSelectionStep } from './datetime-selection-step';
import { PatientDetailsStep } from './patient-details-step';
import { ReviewStep } from './review-step';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bookingSchema = z.object({
  // Step 1: Doctor Selection
  departmentId: z.string().min(1, 'Please select a department'),
  doctorId: z.string().min(1, 'Please select a doctor'),
  
  // Step 2: Date & Time
  appointmentDate: z.date({
    error: 'Please select a date',
  }),
  appointmentTime: z.string().min(1, 'Please select a time slot'),
  
  // Step 3: Patient Details
  reason: z.string().min(10, 'Please provide at least 10 characters'),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  departmentId: string;
  fee: number;
  experience: number;
}

export interface Department {
  id: string;
  name: string;
}

const STEPS = [
  { id: 1, name: 'Select Doctor', description: 'Choose your specialist' },
  { id: 2, name: 'Date & Time', description: 'Pick appointment slot' },
  { id: 3, name: 'Details', description: 'Your information' },
  { id: 4, name: 'Review', description: 'Confirm booking' },
];

export function BookingForm({
  doctors,
  departments,
}: {
  doctors: Doctor[];
  departments: Department[];
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      departmentId: '',
      doctorId: '',
      appointmentTime: '',
      reason: '',
      notes: '',
    },
  });

  const selectedDoctorId = form.watch('doctorId');
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['departmentId', 'doctorId'];
        break;
      case 2:
        fieldsToValidate = ['appointmentDate', 'appointmentTime'];
        break;
      case 3:
        fieldsToValidate = ['reason'];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Create appointment
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to book appointment');

      const result = await response.json();
      
      // Redirect to success page
      router.push(`/appointments/${result.id}/success`);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <StepIndicator steps={STEPS} currentStep={currentStep} />

      {/* Form Card */}
      <Card className="p-6 lg:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step Content */}
            <div className="min-h-100">
              {currentStep === 1 && (
                <DoctorSelectionStep
                  form={form}
                  doctors={doctors}
                  departments={departments}
                />
              )}

              {currentStep === 2 && (
                <DateTimeSelectionStep
                  form={form}
                  doctorId={selectedDoctorId}
                />
              )}

              {currentStep === 3 && (
                <PatientDetailsStep form={form} />
              )}

              {currentStep === 4 && (
                <ReviewStep
                  form={form}
                  doctor={selectedDoctor!}
                  departments={departments}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < STEPS.length ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

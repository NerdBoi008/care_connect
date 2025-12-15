'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const bookingSchema = z.object({
  appointmentDate: z.date({
    error: 'Please select a date',
  }),
  appointmentTime: z.string().min(1, 'Please select a time slot'),
  consultationType: z.enum(['in-person', 'video']),
  reason: z.string().min(10, 'Please provide at least 10 characters'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  fee: number;
  department: string;
  departmentLocation: string;
}

// Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 17; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

export function DoctorBookingForm({ doctor }: { doctor: Doctor }) {
  const [availableSlots, setAvailableSlots] = useState<string[]>(generateTimeSlots());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      consultationType: 'in-person',
      reason: '',
      notes: '',
    },
  });

  const selectedDate = form.watch('appointmentDate');
  const selectedTime = form.watch('appointmentTime');
  const consultationType = form.watch('consultationType');

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          doctorId: doctor.id,
          appointmentDate: format(data.appointmentDate, 'yyyy-MM-dd'),
        }),
      });

      if (!response.ok) throw new Error('Failed to book appointment');

      const result = await response.json();
      router.push(`/appointments/${result.id}/success`);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Consultation Type */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Consultation Type</h3>
          <FormField
            control={form.control}
            name="consultationType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <label
                      htmlFor="in-person"
                      className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        field.value === 'in-person'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value="in-person" id="in-person" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold">In-Person Visit</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Visit the doctor at the clinic
                        </p>
                        {doctor.departmentLocation && (
                          <p className="text-xs text-gray-500 mt-1">
                            📍 {doctor.departmentLocation}
                          </p>
                        )}
                      </div>
                    </label>

                    <label
                      htmlFor="video"
                      className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        field.value === 'video'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <RadioGroupItem value="video" id="video" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Video className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold">Video Consultation</span>
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Consult from home via video call
                        </p>
                      </div>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Date & Time Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div>
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Appointment Date
                    </FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          form.setValue('appointmentTime', '');
                          // Mock: In production, fetch available slots for selected date
                          const mockSlots = generateTimeSlots().filter(() => Math.random() > 0.3);
                          setAvailableSlots(mockSlots);
                        }}
                        disabled={(date) => date < today || date > maxDate}
                        className="rounded-md border"
                        initialFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Time Slots */}
            <div>
              <FormField
                control={form.control}
                name="appointmentTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4" />
                      Available Time Slots
                    </FormLabel>
                    <FormControl>
                      {selectedDate ? (
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                          </div>

                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-2"
                          >
                            {availableSlots.length > 0 ? (
                              availableSlots.map((slot) => (
                                <label
                                  key={slot}
                                  htmlFor={slot}
                                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all text-sm font-medium ${
                                    field.value === slot
                                      ? 'bg-blue-600 text-white border-blue-600'
                                      : 'bg-white hover:border-blue-600'
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={slot}
                                    id={slot}
                                    className="sr-only"
                                  />
                                  {slot}
                                </label>
                              ))
                            ) : (
                              <div className="col-span-3 text-center text-gray-500 py-8">
                                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                No slots available for this date
                              </div>
                            )}
                          </RadioGroup>
                        </div>
                      ) : (
                        <div className="border rounded-lg p-8 text-center text-gray-500">
                          <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          Please select a date first
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Visit Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Visit Details</h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Visit *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your symptoms or reason for consultation..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Help the doctor prepare for your visit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information (allergies, current medications, etc.)..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-medium">{doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Specialization:</span>
                <span className="font-medium">{doctor.specialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">
                  {consultationType === 'in-person' ? 'In-Person Visit' : 'Video Consultation'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-blue-200">
                <span className="text-gray-600">Consultation Fee:</span>
                <span className="font-bold text-xl text-blue-600">₹{doctor.fee}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              You&apos;ll receive a confirmation via email and SMS
            </p>
          </Card>
        )}
      </form>
    </Form>
  );
}

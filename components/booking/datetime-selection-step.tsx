'use client';

import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format, addDays } from 'date-fns';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { BookingFormData } from './booking-form';

// Mock time slots - in production, fetch from API based on doctor availability
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9;
  const endHour = 17;

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  return slots;
};

export function DateTimeSelectionStep({
  form,
  doctorId,
}: {
  form: UseFormReturn<BookingFormData>;
  doctorId: string;
}) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const selectedDate = form.watch('appointmentDate');

  // Mock: Generate available slots when date changes
  useEffect(() => {
    if (selectedDate && doctorId) {
      // In production, fetch actual availability from API
      const allSlots = generateTimeSlots();
      // Randomly mark some slots as unavailable (mock)
      const available = allSlots.filter(() => Math.random() > 0.3);
      setAvailableSlots(available);
    }
  }, [selectedDate, doctorId]);

  const today = new Date();
  const maxDate = addDays(today, 30); // Allow booking up to 30 days ahead

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Date & Time
        </h2>
        <p className="text-gray-600">
          Choose your preferred appointment date and time slot
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Date Selection */}
        <div>
          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Date</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      form.setValue('appointmentTime', ''); // Reset time when date changes
                    }}
                    disabled={(date) =>
                      date < today || date > maxDate
                    }
                    initialFocus
                    className="rounded-md border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <FormField
            control={form.control}
            name="appointmentTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Time Slots</FormLabel>
                <FormControl>
                  {selectedDate ? (
                    <div className="border rounded-lg p-4 max-h-100 overflow-y-auto">
                      <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(selectedDate, 'MMMM d, yyyy')}
                        </span>
                      </div>

                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-2 gap-2"
                      >
                        {availableSlots.length > 0 ? (
                          availableSlots.map((slot) => (
                            <label
                              key={slot}
                              htmlFor={slot}
                              className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all hover:border-blue-600 ${
                                field.value === slot
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white'
                              }`}
                            >
                              <RadioGroupItem
                                value={slot}
                                id={slot}
                                className="sr-only"
                              />
                              <span className="font-medium">{slot}</span>
                            </label>
                          ))
                        ) : (
                          <p className="col-span-2 text-center text-gray-500 py-8">
                            No slots available for this date
                          </p>
                        )}
                      </RadioGroup>
                    </div>
                  ) : (
                    <Card className="p-8 text-center text-gray-500">
                      Please select a date first
                    </Card>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

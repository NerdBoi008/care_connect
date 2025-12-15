'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { BookingFormData } from './booking-form';

export function PatientDetailsStep({ form }: { form: UseFormReturn<BookingFormData> }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Appointment Details
        </h2>
        <p className="text-gray-600">
          Help us prepare for your visit by providing some details
        </p>
      </div>

      {/* Reason for Visit */}
      <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reason for Visit *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please describe your symptoms or reason for consultation..."
                className="min-h-30"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide details about your health concerns or purpose of visit
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Notes */}
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any additional information you'd like the doctor to know..."
                className="min-h-25"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include allergies, current medications, or specific concerns
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

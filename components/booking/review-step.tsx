'use client';

import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  User,
  FileText,
  IndianRupee,
} from 'lucide-react';
import { BookingFormData, Department, Doctor } from './booking-form';

export function ReviewStep({
  form,
  doctor,
  departments,
}: {
  form: UseFormReturn<BookingFormData>;
  doctor: Doctor;
  departments: Department[];
}) {
  const values = form.getValues();
  const department = departments.find((d) => d.id === values.departmentId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Appointment
        </h2>
        <p className="text-gray-600">
          Please verify all details before confirming your booking
        </p>
      </div>

      <div className="space-y-4">
        {/* Doctor Details */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Doctor Information</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-medium">{doctor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Specialization:</span>
              <Badge variant="secondary">{doctor?.specialization}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Department:</span>
              <span className="font-medium">{department?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-medium">{doctor?.experience} years</span>
            </div>
          </div>
        </Card>

        {/* Appointment Details */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Appointment Schedule</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {format(values.appointmentDate, 'MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{values.appointmentTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">30 minutes</span>
            </div>
          </div>
        </Card>

        {/* Visit Details */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Visit Information</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600 block mb-1">Reason for Visit:</span>
              <p className="font-medium text-gray-900">{values.reason}</p>
            </div>
            {values.notes && (
              <div>
                <span className="text-gray-600 block mb-1">Additional Notes:</span>
                <p className="font-medium text-gray-900">{values.notes}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Payment Summary */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <IndianRupee className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Payment Summary</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Consultation Fee:</span>
              <span className="font-medium">₹{doctor?.fee}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="font-bold text-xl text-blue-600">
                ₹{doctor?.fee}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

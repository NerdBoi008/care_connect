'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Clock, IndianRupee } from 'lucide-react';
import { BookingFormData } from './booking-form';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  departmentId: string;
  fee: number;
  experience: number;
}

interface Department {
  id: string;
  name: string;
}

export function DoctorSelectionStep({
  form,
  doctors,
  departments,
}: {
  form: UseFormReturn<BookingFormData>;
  doctors: Doctor[];
  departments: Department[];
}) {
  const selectedDepartment = form.watch('departmentId');
  const filteredDoctors = selectedDepartment
    ? doctors.filter((d) => d.departmentId === selectedDepartment)
    : doctors;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Doctor
        </h2>
        <p className="text-gray-600">
          Select a department and choose your preferred specialist
        </p>
      </div>

      {/* Department Selection */}
      <FormField
        control={form.control}
        name="departmentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                form.setValue('doctorId', ''); // Reset doctor selection
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Doctor Selection */}
      <FormField
        control={form.control}
        name="doctorId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Doctor</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-3"
              >
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        field.value === doctor.id
                          ? 'ring-2 ring-blue-600 bg-blue-50'
                          : ''
                      }`}
                    >
                      <label
                        htmlFor={doctor.id}
                        className="flex items-start gap-4 cursor-pointer"
                      >
                        <RadioGroupItem value={doctor.id} id={doctor.id} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">
                                {doctor.name}
                              </h3>
                              <Badge variant="secondary" className="mt-1">
                                {doctor.specialization}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <GraduationCap className="h-4 w-4" />
                              <span>MBBS, MD</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{doctor.experience} years exp</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <IndianRupee className="h-4 w-4" />
                              <span>₹{doctor.fee}</span>
                            </div>
                          </div>
                        </div>
                      </label>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    {selectedDepartment
                      ? 'No doctors available in this department'
                      : 'Please select a department first'}
                  </p>
                )}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

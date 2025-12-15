'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Mock availability - in production, fetch from database
const mockAvailability = [
  { day: 1, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
  { day: 2, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
  { day: 3, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
  { day: 4, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
  { day: 5, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
  { day: 6, slots: ['09:00 AM - 01:00 PM'] },
];

export function DoctorAvailability({ doctorId }: { doctorId: string }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Weekly Availability</h2>
      
      <div className="space-y-3">
        {DAYS.map((day, index) => {
          const dayAvailability = mockAvailability.find(a => a.day === index);
          
          return (
            <div
              key={day}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${dayAvailability ? 'bg-green-600' : 'bg-gray-300'}`} />
                <span className="font-medium">{day}</span>
              </div>

              <div>
                {dayAvailability ? (
                  <div className="flex flex-wrap gap-2">
                    {dayAvailability.slots.map((slot, i) => (
                      <Badge key={i} variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {slot}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Badge variant="outline" className="text-gray-500">
                    Unavailable
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-600">
        <strong>Note:</strong> Availability may vary due to emergency cases or special circumstances. 
        Please confirm your appointment after booking.
      </div>
    </Card>
  );
}

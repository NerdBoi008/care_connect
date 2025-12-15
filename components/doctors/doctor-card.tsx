import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, Calendar, GraduationCap, Clock } from 'lucide-react';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    specialization: string;
    qualification: string;
    experience: number;
    fee: number;
    bio: string;
    department: string;
    rating: number;
    reviews: number;
    available: boolean;
  };
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex gap-4 mb-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20 shrink-0">
            <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
              {doctor.firstName[0]}{doctor.lastName[0]}
            </AvatarFallback>
          </Avatar>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/doctors/${doctor.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                {doctor.name}
              </h3>
            </Link>

            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary">{doctor.specialization}</Badge>
              {doctor.available && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Available
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{doctor.rating.toFixed(1)}</span>
              <span className="text-gray-500">({doctor.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-start gap-2">
            <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div className="text-gray-500">Qualification</div>
              <div className="font-medium">{doctor.qualification}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div className="text-gray-500">Experience</div>
              <div className="font-medium">{doctor.experience} years</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div className="text-gray-500">Department</div>
              <div className="font-medium truncate">{doctor.department}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <div className="text-gray-500">Consultation</div>
              <div className="font-medium">₹{doctor.fee}</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {doctor.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {doctor.bio}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href={`/doctors/${doctor.id}/book`}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

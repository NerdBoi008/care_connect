import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SpecializationCardProps {
  specialization: {
    id: string;
    name: string;
    doctorCount: number;
    icon: string;
    color: string;
    description: string;
    commonConditions: string[];
  };
}

export function SpecializationCard({ specialization }: SpecializationCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group">
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-16 h-16 rounded-xl ${specialization.color} border-2 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}
          >
            {specialization.icon}
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {specialization.doctorCount}
          </Badge>
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {specialization.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {specialization.description}
        </p>

        {/* Common Conditions */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Common Conditions
          </h4>
          <div className="space-y-1">
            {specialization.commonConditions.slice(0, 3).map((condition, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>{condition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button asChild className="flex-1" size="sm">
            <Link href={`/doctors?specialization=${encodeURIComponent(specialization.name)}`}>
              View Doctors
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

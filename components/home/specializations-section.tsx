import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Eye, 
  Stethoscope,
  Pill,
  Activity
} from 'lucide-react';

export function SpecializationsSection() {
  const specializations = [
    { icon: Heart, name: 'Cardiology', doctors: 45, color: 'text-red-600 bg-red-50' },
    { icon: Brain, name: 'Neurology', doctors: 38, color: 'text-purple-600 bg-purple-50' },
    { icon: Baby, name: 'Pediatrics', doctors: 52, color: 'text-pink-600 bg-pink-50' },
    { icon: Bone, name: 'Orthopedics', doctors: 41, color: 'text-orange-600 bg-orange-50' },
    { icon: Eye, name: 'Ophthalmology', doctors: 29, color: 'text-blue-600 bg-blue-50' },
    { icon: Stethoscope, name: 'General Medicine', doctors: 67, color: 'text-green-600 bg-green-50' },
    { icon: Pill, name: 'Dermatology', doctors: 34, color: 'text-yellow-600 bg-yellow-50' },
    { icon: Activity, name: 'Emergency Care', doctors: 56, color: 'text-red-600 bg-red-50' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse by Specialization
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the right specialist for your needs from our network of 
            expert healthcare professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {specializations.map((spec, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-lg ${spec.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <spec.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {spec.name}
              </h3>
              <p className="text-sm text-gray-500">
                {spec.doctors} Doctors
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/specializations">
              View All Specializations
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

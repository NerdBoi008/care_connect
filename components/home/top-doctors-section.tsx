import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

export function TopDoctorsSection() {
  // In real app, fetch from database using Drizzle
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      specialization: 'Cardiologist',
      experience: 15,
      rating: 4.9,
      reviews: 234,
      fee: 1500,
      location: 'Mumbai',
      available: true
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Neurologist',
      experience: 12,
      rating: 4.8,
      reviews: 189,
      fee: 1800,
      location: 'Delhi',
      available: true
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialization: 'Pediatrician',
      experience: 10,
      rating: 4.9,
      reviews: 312,
      fee: 1200,
      location: 'Bangalore',
      available: false
    },
    {
      id: '4',
      name: 'Dr. Amit Patel',
      specialization: 'Orthopedic',
      experience: 18,
      rating: 4.7,
      reviews: 156,
      fee: 2000,
      location: 'Pune',
      available: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Top Doctors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Highly qualified and experienced professionals dedicated to 
            providing you with the best healthcare.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="w-20 h-20 mb-3">
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  
                  <Badge variant="secondary" className="mb-2">
                    {doctor.specialization}
                  </Badge>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span>({doctor.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4" />
                    {doctor.location}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span className="font-medium">{doctor.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consultation:</span>
                    <span className="font-medium">₹{doctor.fee}</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full" 
                  variant={doctor.available ? 'default' : 'secondary'}
                  disabled={!doctor.available}
                >
                  <Link href={`/doctors/${doctor.id}/book`}>
                    {doctor.available ? 'Book Appointment' : 'Not Available'}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/doctors">
              View All Doctors
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

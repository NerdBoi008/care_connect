import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Search, Activity } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                🏥 Your Health, Our Priority
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Quality Healthcare
              <span className="text-blue-600"> Made Easy</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Book appointments with top doctors, manage your medical records, 
              and get instant consultations - all in one place. Experience 
              healthcare that puts you first.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/book-appointment">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/doctors">
                  <Search className="mr-2 h-5 w-5" />
                  Find Doctors
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-8 pt-6 border-t">
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Expert Doctors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Right Image/Illustration */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
              {/* Replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-64 h-64 text-blue-600 opacity-20" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute top-20 left-10 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Appointment Confirmed</div>
                    <div className="text-xs text-gray-500">Dr. Sarah Wilson</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-10 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">24/7 Available</div>
                    <div className="text-xs text-gray-500">Book Anytime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

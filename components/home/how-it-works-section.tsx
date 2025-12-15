import { Card } from '@/components/ui/card';
import { UserPlus, Search, Calendar, Video } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up in seconds with your email or phone number. Set up your profile with basic health information.'
    },
    {
      icon: Search,
      title: 'Find Doctor',
      description: 'Browse specialists by department, location, availability, or search by name. Read reviews and compare doctors.'
    },
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Select your preferred date and time slot. Get instant confirmation and reminders before your appointment.'
    },
    {
      icon: Video,
      title: 'Get Consultation',
      description: 'Visit in-person or connect virtually. Receive prescriptions and medical records digitally after consultation.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting quality healthcare is just four simple steps away
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                
                <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 mt-2">
                  <step.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-gray-600">
                  {step.description}
                </p>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

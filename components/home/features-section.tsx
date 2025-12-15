import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  MessageSquare, 
  FileText, 
  Video, 
  Clock, 
  Shield 
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Appointment Booking',
      description: 'Schedule appointments with your preferred doctors in just a few clicks. Choose date, time, and get instant confirmation.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Direct Messaging',
      description: 'Communicate directly with your healthcare providers. Ask questions, get advice, and stay connected.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: FileText,
      title: 'Digital Medical Records',
      description: 'Access your complete medical history, prescriptions, and test results anytime, anywhere, securely.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Video,
      title: 'Virtual Consultations',
      description: 'Connect with doctors remotely through video calls. Get healthcare from the comfort of your home.',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'View real-time doctor availability and book appointments that fit your schedule perfectly.',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security. HIPAA compliant and encrypted.',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience healthcare designed around you. Our platform combines 
            cutting-edge technology with compassionate care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

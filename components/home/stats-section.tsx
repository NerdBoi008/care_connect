import { Users, Clock, Award, Heart } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Expert Doctors',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      value: '50K+',
      label: 'Happy Patients',
      color: 'text-red-600'
    },
    {
      icon: Award,
      value: '25+',
      label: 'Years Experience',
      color: 'text-yellow-600'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Support Available',
      color: 'text-green-600'
    }
  ];

  return (
    <section className="py-16 bg-white border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

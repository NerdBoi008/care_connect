import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Heart,
  Users,
  Award,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Lightbulb,
  CheckCircle2,
  Star,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | HealthCarePlus',
  description: 'Learn about HealthCarePlus - our mission, values, and commitment to providing world-class healthcare services.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
              Since 2010
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              We're Here for Every Care in the World
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              HealthCarePlus is committed to providing accessible, compassionate, 
              and world-class healthcare to every patient, every day.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '500+', label: 'Expert Doctors' },
              { icon: Heart, value: '50K+', label: 'Happy Patients' },
              { icon: Award, value: '25+', label: 'Years of Excellence' },
              { icon: TrendingUp, value: '98%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-50 rounded-full">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Mission & Vision
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We strive to transform healthcare delivery through innovation, 
                compassion, and excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide accessible, affordable, and high-quality healthcare 
                  services to all individuals and families. We are committed to 
                  treating every patient with dignity, respect, and personalized 
                  care that addresses their unique needs.
                </p>
              </Card>

              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading healthcare provider recognized for clinical 
                  excellence, innovative treatments, and compassionate care. We 
                  envision a future where quality healthcare is accessible to 
                  everyone, everywhere.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Compassion',
                  description: 'We treat every patient with empathy, kindness, and understanding, recognizing their unique needs and concerns.',
                  color: 'bg-red-50 text-red-600',
                },
                {
                  icon: Shield,
                  title: 'Excellence',
                  description: 'We maintain the highest standards of medical care, continuously improving our services and staying updated with medical advances.',
                  color: 'bg-blue-50 text-blue-600',
                },
                {
                  icon: Users,
                  title: 'Collaboration',
                  description: 'We work together as a team, partnering with patients and families to achieve the best possible health outcomes.',
                  color: 'bg-green-50 text-green-600',
                },
                {
                  icon: CheckCircle2,
                  title: 'Integrity',
                  description: 'We operate with honesty, transparency, and ethical principles in all our interactions and decisions.',
                  color: 'bg-purple-50 text-purple-600',
                },
                {
                  icon: Lightbulb,
                  title: 'Innovation',
                  description: 'We embrace new technologies and methods to improve patient care and streamline healthcare delivery.',
                  color: 'bg-yellow-50 text-yellow-600',
                },
                {
                  icon: Star,
                  title: 'Quality',
                  description: 'We are committed to providing safe, effective, and patient-centered care that exceeds expectations.',
                  color: 'bg-orange-50 text-orange-600',
                },
              ].map((value, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 rounded-lg ${value.color} flex items-center justify-center mb-4`}>
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2010, HealthCarePlus began with a simple yet powerful vision: 
                to make quality healthcare accessible to everyone. What started as a small 
                clinic with a handful of dedicated doctors has grown into a comprehensive 
                healthcare network serving over 50,000 patients annually.
              </p>

              <p>
                Over the years, we've expanded our services, added state-of-the-art 
                facilities, and built a team of over 500 highly qualified healthcare 
                professionals. Our commitment to patient-centered care has remained 
                unwavering, even as we've grown.
              </p>

              <p>
                Today, HealthCarePlus stands as a testament to what's possible when 
                medical excellence meets genuine compassion. We continue to innovate, 
                investing in the latest medical technologies and treatment methods while 
                maintaining the personal touch that has always defined our care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Led by Experienced Professionals
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Our leadership team brings decades of combined experience in healthcare 
              management, medical practice, and patient advocacy.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { name: 'Dr. Rajesh Kumar', role: 'Chief Medical Officer', exp: '25+ years' },
                { name: 'Dr. Priya Sharma', role: 'Head of Surgery', exp: '20+ years' },
                { name: 'Amit Patel', role: 'CEO', exp: '15+ years' },
              ].map((member, index) => (
                <Card key={index} className="p-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-blue-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.exp} experience</p>
                </Card>
              ))}
            </div>

            <Button asChild size="lg">
              <Link href="/doctors">Meet Our Doctors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Experience the HealthCarePlus Difference
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied patients who trust us with their health
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { ContactForm } from '@/components/contact/contact-form';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Calendar,
} from 'lucide-react';

export const metadata = {
  title: 'Contact Us | HealthCarePlus',
  description: 'Get in touch with HealthCarePlus. We\'re here to help with appointments, inquiries, and support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-blue-100">
              Have questions? We&apos;re here to help. Reach out to us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Book Appointment</h3>
              <p className="text-sm text-gray-600 mb-4">
                Schedule a visit with our doctors
              </p>
              <a
                href="/book-appointment"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Book Now →
              </a>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chat with our support team
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Start Chat →
              </button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-4">
                Speak with a representative
              </p>
              <a
                href="tel:+911234567890"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                +91 123 456 7890 →
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our team is available to assist you with any questions or 
                  concerns. Feel free to reach out through any of the following 
                  channels.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Address</h3>
                      <p className="text-gray-600 leading-relaxed">
                        123 Healthcare Avenue<br />
                        Medical District<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Phone */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Phone</h3>
                      <div className="space-y-1">
                        <p className="text-gray-600">
                          <span className="font-medium">General:</span>{' '}
                          <a href="tel:+911234567890" className="hover:text-blue-600">
                            +91 123 456 7890
                          </a>
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Emergency:</span>{' '}
                          <a href="tel:+911234567891" className="hover:text-blue-600">
                            +91 123 456 7891
                          </a>
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Appointments:</span>{' '}
                          <a href="tel:+911234567892" className="hover:text-blue-600">
                            +91 123 456 7892
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Email */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <div className="space-y-1">
                        <p className="text-gray-600">
                          <span className="font-medium">General:</span>{' '}
                          <a href="mailto:info@healthcareplus.com" className="hover:text-blue-600">
                            info@healthcareplus.com
                          </a>
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Support:</span>{' '}
                          <a href="mailto:support@healthcareplus.com" className="hover:text-blue-600">
                            support@healthcareplus.com
                          </a>
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Careers:</span>{' '}
                          <a href="mailto:careers@healthcareplus.com" className="hover:text-blue-600">
                            careers@healthcareplus.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Hours */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                      <div className="space-y-1 text-gray-600">
                        <p><span className="font-medium">Mon - Fri:</span> 8:00 AM - 8:00 PM</p>
                        <p><span className="font-medium">Saturday:</span> 9:00 AM - 5:00 PM</p>
                        <p><span className="font-medium">Sunday:</span> 10:00 AM - 2:00 PM</p>
                        <p className="text-red-600 font-medium mt-2">
                          Emergency services available 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Map Placeholder */}
              <Card className="p-4">
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Location will be displayed here</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8">
              Find quick answers to common questions
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                {
                  q: 'How do I book an appointment?',
                  a: 'You can book online through our website, call us, or visit in person.',
                },
                {
                  q: 'Do you accept insurance?',
                  a: 'Yes, we accept most major insurance plans. Contact us for details.',
                },
                {
                  q: 'What should I bring to my appointment?',
                  a: 'Bring your ID, insurance card, and any relevant medical records.',
                },
                {
                  q: 'Can I change my appointment?',
                  a: 'Yes, contact us at least 24 hours before to reschedule.',
                },
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

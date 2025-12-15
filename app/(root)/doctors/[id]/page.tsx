import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { getDoctorById, getDoctorReviews } from '@/lib/data/doctors-detail';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  GraduationCap, 
  Clock, 
  MapPin,
  Calendar,
  Award,
  MessageSquare,
  Video,
  Building2,
  Phone,
  Mail,
  Languages,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';
import { ReviewsList } from '@/components/doctors/reviews-list';
import { DoctorAvailability } from '@/components/doctors/doctor-availability';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  
  if (!doctor) {
    return {
      title: 'Doctor Not Found',
    };
  }

  return {
    title: `${doctor.name} - ${doctor.specialization} | HealthCarePlus`,
    description: `View profile of ${doctor.name}, an experienced ${doctor.specialization} with ${doctor.experience} years of experience. Book your appointment today.`,
  };
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params
  const [doctor, reviews] = await Promise.all([
    getDoctorById(id),
    getDoctorReviews(id),
  ]);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-linear-to-br from-blue-50 via-white to-blue-50 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm">
              <Link href="/doctors" className="text-blue-600 hover:text-blue-700">
                All Doctors
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">{doctor.name}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Doctor Info */}
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <Avatar className="w-32 h-32 shrink-0 ring-4 ring-white shadow-lg">
                    <AvatarFallback className="text-4xl bg-linear-to-br from-blue-500 to-blue-600 text-white">
                      {doctor.firstName[0]}{doctor.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                          {doctor.name}
                        </h1>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="text-base px-3 py-1">
                            {doctor.specialization}
                          </Badge>
                          {doctor.available && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-base px-3 py-1">
                              <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse" />
                              Available Today
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(doctor.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-lg">{doctor.rating.toFixed(1)}</span>
                      <span className="text-gray-500">({doctor.reviews} reviews)</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-4">
                      {doctor.bio || `${doctor.name} is an experienced ${doctor.specialization} with ${doctor.experience} years of practice, dedicated to providing exceptional patient care.`}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <ThumbsUp className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-600">98% Patients Satisfied</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-600">Verified Profile</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Card */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <div className="text-center mb-6 pb-6 border-b">
                    <div className="text-sm text-gray-600 mb-2">Consultation Fee</div>
                    <div className="text-4xl font-bold text-blue-600 mb-1">
                      ₹{doctor.fee}
                    </div>
                    <div className="text-sm text-gray-500">per session</div>
                  </div>

                  <div className="space-y-3">
                    <Button asChild size="lg" className="w-full">
                      <Link href={`/doctors/${doctor.id}/book`}>
                        <Calendar className="h-5 w-5 mr-2" />
                        Book Appointment
                      </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="w-full">
                      <Link href={`/messages?doctor=${doctor.id}`}>
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Send Message
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="h-4 w-4" />
                      <span>Video consultation available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>In-person visits available</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* About */}
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About Dr. {doctor.lastName}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {doctor.bio || `Dr. ${doctor.lastName} is a highly qualified ${doctor.specialization} with extensive experience in treating various conditions. With ${doctor.experience} years of medical practice, Dr. ${doctor.lastName} is committed to providing personalized care and staying updated with the latest medical advancements.`}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Known for a patient-centric approach, Dr. {doctor.lastName} takes time to understand each patient&apos;s unique needs and provides comprehensive treatment plans. The practice focuses on evidence-based medicine combined with compassionate care.
                    </p>
                  </Card>

                  {/* Education & Experience */}
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Education & Experience</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                          Education
                        </h3>
                        <ul className="space-y-2 ml-7">
                          <li className="text-gray-600">
                            <div className="font-medium">{doctor.qualification}</div>
                            <div className="text-sm text-gray-500">Medical Degree</div>
                          </li>
                          <li className="text-gray-600">
                            <div className="font-medium">Specialization in {doctor.specialization}</div>
                            <div className="text-sm text-gray-500">Post Graduate Studies</div>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                          <Award className="h-5 w-5 text-blue-600" />
                          Experience
                        </h3>
                        <div className="ml-7">
                          <div className="text-gray-600">
                            <span className="font-medium">{doctor.experience} years</span> of clinical experience
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Specialized in {doctor.specialization} and related conditions
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Specializations */}
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Areas of Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{doctor.specialization}</Badge>
                      <Badge variant="outline">General Consultation</Badge>
                      <Badge variant="outline">Preventive Care</Badge>
                      <Badge variant="outline">Treatment Planning</Badge>
                      <Badge variant="outline">Patient Management</Badge>
                    </div>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <Suspense fallback={<div>Loading reviews...</div>}>
                    <ReviewsList reviews={reviews} doctorName={doctor.name} />
                  </Suspense>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability">
                  <DoctorAvailability doctorId={doctor.id} />
                </TabsContent>

                {/* Location Tab */}
                <TabsContent value="location">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Clinic Location</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-start gap-3 mb-4">
                          <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                          <div>
                            <div className="font-semibold text-lg mb-1">{doctor.department} Department</div>
                            {doctor.departmentLocation && (
                              <div className="text-gray-600">{doctor.departmentLocation}</div>
                            )}
                            <div className="text-gray-600">HealthCarePlus Hospital</div>
                          </div>
                        </div>

                        {doctor.phone && (
                          <div className="flex items-center gap-3 mb-3">
                            <Phone className="h-5 w-5 text-blue-600" />
                            <a href={`tel:${doctor.phone}`} className="text-gray-600 hover:text-blue-600">
                              {doctor.phone}
                            </a>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">
                            appointments@healthcareplus.com
                          </span>
                        </div>
                      </div>

                      {/* Map placeholder */}
                      <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="h-12 w-12 mx-auto mb-2" />
                          <p>Map view</p>
                          <p className="text-sm">Interactive map will be displayed here</p>
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <a 
                          href="https://maps.google.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Get Directions
                        </a>
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Info */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-500">Experience</div>
                      <div className="font-medium">{doctor.experience} years</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-500">Qualification</div>
                      <div className="font-medium">{doctor.qualification}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-500">Department</div>
                      <div className="font-medium">{doctor.department}</div>
                    </div>
                  </div>

                  {doctor.languages && doctor.languages.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Languages className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-gray-500">Languages</div>
                        <div className="font-medium">{doctor.languages.join(', ')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Services */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Services Offered</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>In-person consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Video consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Follow-up appointments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Medical reports review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Health monitoring</span>
                  </li>
                </ul>
              </Card>

              {/* Similar Doctors */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Similar Doctors</h3>
                <div className="space-y-3">
                  <Link 
                    href="/doctors?specialization=Cardiology" 
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm">View all {doctor.specialization}s</div>
                    <div className="text-xs text-gray-500">Find more specialists</div>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

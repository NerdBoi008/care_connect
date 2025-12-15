import { notFound } from "next/navigation";
import { getDoctorById } from "@/lib/data/doctors-detail";
import { DoctorBookingForm } from "@/components/doctors/doctor-booking-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, GraduationCap, Clock, IndianRupee, MapPin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    return {
      title: "Doctor Not Found",
    };
  }

  return {
    title: `Book Appointment with ${doctor.name} | HealthCarePlus`,
    description: `Schedule your appointment with ${doctor.name}, ${doctor.specialization}`,
  };
}

export default async function DoctorBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = await getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <a
              href={`/doctors/${doctor.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block"
            >
              ← Back to Profile
            </a>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Appointment
            </h1>
            <p className="text-gray-600">
              Schedule your consultation with {doctor.name}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Doctor Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                      {doctor.firstName[0]}
                      {doctor.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h2>

                  <Badge variant="secondary" className="mb-3">
                    {doctor.specialization}
                  </Badge>

                  <div className="flex items-center justify-center gap-1 text-sm mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span className="text-gray-500">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-sm border-t pt-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-500">Qualification</div>
                      <div className="font-medium">{doctor.qualification}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-500">Experience</div>
                      <div className="font-medium">
                        {doctor.experience} years
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-500">Department</div>
                      <div className="font-medium">{doctor.department}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <IndianRupee className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-gray-500">Consultation Fee</div>
                      <div className="font-bold text-lg text-blue-600">
                        ₹{doctor.fee}
                      </div>
                    </div>
                  </div>
                </div>

                {doctor.languages && doctor.languages.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-500 mb-2">Languages</div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <DoctorBookingForm doctor={doctor} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

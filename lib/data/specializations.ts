import { doctors, departments } from '@/lib/db/src/schema';
import { eq, count } from 'drizzle-orm';
import { db } from '@/lib/db/src';

export async function getSpecializationsWithDoctors() {
  // Get all unique specializations with doctor counts
  const specializationsData = await db
    .select({
      specialization: doctors.specialization,
      doctorCount: count(doctors.id),
    })
    .from(doctors)
    .groupBy(doctors.specialization)
    .orderBy(doctors.specialization);

  // Map specializations to include metadata
  const specializationsWithMeta = specializationsData.map((spec) => {
    const meta = getSpecializationMetadata(spec.specialization);
    return {
      id: spec.specialization.toLowerCase().replace(/\s+/g, '-'),
      name: spec.specialization,
      doctorCount: Number(spec.doctorCount),
      ...meta,
    };
  });

  return specializationsWithMeta;
}

export async function getSpecializationDetails(specializationName: string) {
  // Get doctors for specific specialization
  const doctorsInSpecialization = await db
    .select({
      id: doctors.id,
      firstName: doctors.firstName,
      lastName: doctors.lastName,
      specialization: doctors.specialization,
      qualification: doctors.qualification,
      experienceYears: doctors.experienceYears,
      consultationFee: doctors.consultationFee,
      bio: doctors.bio,
      department: {
        id: departments.id,
        name: departments.name,
      },
    })
    .from(doctors)
    .leftJoin(departments, eq(doctors.departmentId, departments.id))
    .where(eq(doctors.specialization, specializationName));

  return doctorsInSpecialization;
}

// Helper function to get specialization metadata
function getSpecializationMetadata(specialization: string) {
  const metadata: Record<string, {
    icon: string;
    color: string;
    description: string;
    commonConditions: string[];
  }> = {
    'Cardiology': {
      icon: '❤️',
      color: 'bg-red-50 text-red-600 border-red-200',
      description: 'Specialized care for heart and cardiovascular system disorders',
      commonConditions: ['Heart Disease', 'High Blood Pressure', 'Arrhythmia', 'Heart Failure']
    },
    'Neurology': {
      icon: '🧠',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      description: 'Expert diagnosis and treatment of nervous system disorders',
      commonConditions: ['Stroke', 'Epilepsy', 'Parkinson\'s', 'Migraines']
    },
    'Pediatrics': {
      icon: '👶',
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      description: 'Comprehensive healthcare for infants, children, and adolescents',
      commonConditions: ['Vaccinations', 'Growth Issues', 'Childhood Diseases', 'Developmental Disorders']
    },
    'Orthopedics': {
      icon: '🦴',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      description: 'Treatment of musculoskeletal system injuries and disorders',
      commonConditions: ['Fractures', 'Arthritis', 'Sports Injuries', 'Joint Replacement']
    },
    'Dermatology': {
      icon: '💆',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      description: 'Diagnosis and treatment of skin, hair, and nail conditions',
      commonConditions: ['Acne', 'Eczema', 'Psoriasis', 'Skin Cancer']
    },
    'Ophthalmology': {
      icon: '👁️',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      description: 'Complete eye care including surgery and vision correction',
      commonConditions: ['Cataracts', 'Glaucoma', 'Vision Problems', 'Eye Infections']
    },
    'General Physician': {
      icon: '🩺',
      color: 'bg-green-50 text-green-600 border-green-200',
      description: 'Primary care for general health concerns and preventive medicine',
      commonConditions: ['Fever', 'Common Cold', 'Diabetes', 'Hypertension']
    },
    'Psychiatry': {
      icon: '🧘',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      description: 'Mental health diagnosis, treatment, and counseling services',
      commonConditions: ['Depression', 'Anxiety', 'Bipolar Disorder', 'PTSD']
    },
    'Gastroenterology': {
      icon: '🫁',
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      description: 'Treatment of digestive system and gastrointestinal disorders',
      commonConditions: ['IBS', 'Ulcers', 'Liver Disease', 'GERD']
    },
    'Pulmonology': {
      icon: '🫁',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      description: 'Respiratory system care and lung disease treatment',
      commonConditions: ['Asthma', 'COPD', 'Pneumonia', 'Sleep Apnea']
    },
    'Endocrinology': {
      icon: '⚕️',
      color: 'bg-violet-50 text-violet-600 border-violet-200',
      description: 'Hormone disorders and metabolic conditions treatment',
      commonConditions: ['Diabetes', 'Thyroid Disorders', 'Obesity', 'Hormonal Imbalance']
    },
    'Oncology': {
      icon: '🎗️',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      description: 'Cancer diagnosis, treatment, and comprehensive care',
      commonConditions: ['Breast Cancer', 'Lung Cancer', 'Chemotherapy', 'Radiation Therapy']
    },
  };

  return metadata[specialization] || {
    icon: '⚕️',
    color: 'bg-gray-50 text-gray-600 border-gray-200',
    description: 'Specialized medical care and treatment',
    commonConditions: ['General Treatment', 'Diagnosis', 'Consultation']
  };
}

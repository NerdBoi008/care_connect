import { departments, doctors, users } from "@/lib/db/src/schema";
import { db } from "@/lib/db/src";

async function seedSpecializations() {
  // Create departments
  const deptIds = await db
    .insert(departments)
    .values([
      {
        name: "Cardiology",
        description: "Heart and vascular care",
        location: "Building A, Floor 3",
      },
      {
        name: "Neurology",
        description: "Brain and nervous system",
        location: "Building B, Floor 2",
      },
      {
        name: "Pediatrics",
        description: "Child healthcare",
        location: "Building C, Floor 1",
      },
      {
        name: "Orthopedics",
        description: "Bone and joint care",
        location: "Building A, Floor 2",
      },
      {
        name: "Dermatology",
        description: "Skin care",
        location: "Building B, Floor 1",
      },
    ])
    .returning({ id: departments.id });

  console.log("Departments created:", deptIds.length);

  // Create sample doctors
  const specializations = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Ophthalmology",
    "General Physician",
    "Psychiatry",
  ];

  for (const spec of specializations) {
    const numDoctors = Math.floor(Math.random() * 10) + 5;

    for (let i = 0; i < numDoctors; i++) {
      // Create user
      const [user] = await db
        .insert(users)
        .values({
          email: `${spec
            .toLowerCase()
            .replace(/\s+/g, "")}.doctor${i}@hospital.com`,
          passwordHash: "hashed_password_here",
          role: "doctor",
        })
        .returning();

      // Create doctor
      await db.insert(doctors).values({
        userId: user.id,
        firstName: `Doctor${i}`,
        lastName: spec.split(" ")[0],
        departmentId: deptIds[Math.floor(Math.random() * deptIds.length)]?.id,
        specialization: spec,
        qualification: "MBBS, MD",
        experienceYears: String(Math.floor(Math.random() * 20) + 5),
        consultationFee: (Math.floor(Math.random() * 30) + 10) * 100,
        bio: `Experienced ${spec} specialist with expertise in various conditions.`,
      });
    }
  }

  console.log("Sample doctors created!");
}

seedSpecializations().catch(console.error);

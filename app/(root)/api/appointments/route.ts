import { NextResponse } from 'next/server';
import { db } from '@/lib/db/src';
import { appointments } from '@/lib/db/src/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In production: 
    // 1. Verify user is authenticated
    // 2. Validate appointment availability
    // 3. Create invoice record
    // 4. Send confirmation email/SMS
    
    const [appointment] = await db
      .insert(appointments)
      .values({
        patientId: 'mock-patient-id', // Get from session
        doctorId: body.doctorId,
        appointmentDate: body.appointmentDate,
        appointmentTime: body.appointmentTime,
        reason: body.reason,
        notes: body.notes,
        status: 'pending',
      })
      .returning();

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Appointment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

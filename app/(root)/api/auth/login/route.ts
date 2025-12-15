import { NextResponse } from 'next/server';
import { db } from '@/lib/db/src';
import { users, patients, doctors } from '@/lib/db/src/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Find user by email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Get additional user info based on role
    let userData = { ...user };

    if (user.role === 'patient') {
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.userId, user.id))
        .limit(1);
      
      if (patient) {
        userData = { ...userData, profile: patient };
      }
    } else if (user.role === 'doctor') {
      const [doctor] = await db
        .select()
        .from(doctors)
        .where(eq(doctors.userId, user.id))
        .limit(1);
      
      if (doctor) {
        userData = { ...userData, profile: doctor };
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { passwordHash, ...userWithoutPassword } = userData;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

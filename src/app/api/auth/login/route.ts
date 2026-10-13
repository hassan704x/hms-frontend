// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock user data - replace with your actual database logic
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'admin@hospital.com',
    password: 'admin123', // In real app, this should be hashed
    role: 'admin'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'doctor@hospital.com',
    password: 'doctor123', // In real app, this should be hashed
    role: 'doctor'
  },
  {
    id: '3',
    name: 'Patient User',
    email: 'patient@hospital.com',
    password: 'patient123', // In real app, this should be hashed
    role: 'patient'
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user - replace with actual database query
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key', // Use environment variable
      { expiresIn: '24h' }
    );

    // Create response
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

    // Set httpOnly cookie for additional security (optional)
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
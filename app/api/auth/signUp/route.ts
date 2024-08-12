import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectToDatabase from '@/lib/mongoose';

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, password } = await req.json();
  if(!(email && password)) {
    return NextResponse.json({ message: 'Field is required' }, { status: 400 });
  }
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Create a new user
  const newUser = new User({ email, password });
  await newUser.save();

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectToDatabase from '@/lib/mongoose';

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, password } = await req.json();
  if(!(email && password)) {
    return NextResponse.json({ message: 'Field is required.' }, { status: 400 });
  }
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  // Create JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 200 });
}

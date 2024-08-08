import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectToDatabase from '@/lib/mongoose';

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, newPassword } = await req.json();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Update user's password
  user.password = newPassword;
  await user.save();

  return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
}

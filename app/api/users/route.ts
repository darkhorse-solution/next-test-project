import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongoose';
import User from '../../../models/User';

export async function GET() {
  await connectToDatabase();
  const users = await User.find({});
  return NextResponse.json({ success: true, data: users });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();

  try {
    const user = await User.create(body);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

import { authMiddleware } from '@/middleware/requireAuth';
import { NextRequest, NextResponse } from 'next/server';
import Video from '@/models/Video';
import connectToDatabase from '@/lib/mongoose';
import { AuthenticatedRequest } from '@/types';

export async function GET(req: NextRequest) {
  await connectToDatabase();

  // No need for authMiddleware here, it's an open route
  const videos = await Video.find({});
  return NextResponse.json(videos, { status: 200 });
}

export async function POST(req: AuthenticatedRequest) {
  const authResponse = authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDatabase();

  // Create video
  const { title, publishYear, link } = await req.json();
  const video = new Video({ title, publishYear, link, createdBy: req.user!.id });
  await video.save();

  return NextResponse.json(video, { status: 201 });
}

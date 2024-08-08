import { authMiddleware } from '@/middleware/requireAuth';
import { NextRequest, NextResponse } from 'next/server';
import Video from '@/models/Video';
import connectToDatabase from '@/lib/mongoose';
import { AuthenticatedRequest } from '@/types';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // disable Next.js's built-in bodyParser
  },
};

const uploadDir = path.join(process.cwd(), 'uploads/videos');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const videos = await Video.find({});
  return NextResponse.json(videos, { status: 200 });
}

export async function POST(req: AuthenticatedRequest) {
  const authResponse = authMiddleware(req);
  
  if (authResponse) return authResponse;

  await connectToDatabase();

  const { title, publishYear, link } = await req.json();
  const video = new Video({ title, publishYear, link, createdBy: req.user?.id });
  await video.save();

  return NextResponse.json(video, { status: 201 });
}

// PUT: Update a video by ID
export async function PUT(req: AuthenticatedRequest) {
  const authResponse = authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDatabase();

  const { id, title, publishYear, link } = await req.json();

  const video = await Video.findById(id);
  if (!video) {
    return NextResponse.json({ message: 'Video not found' }, { status: 404 });
  }

  // Ensure the user is the owner of the video
  if (video.createdBy.toString() !== req.user!.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  video.title = title;
  video.publishYear = publishYear;
  video.link = link;
  await video.save();

  return NextResponse.json(video, { status: 200 });
}

// DELETE: Delete a video by ID
export async function DELETE(req: AuthenticatedRequest) {
  const authResponse = authMiddleware(req);
  if (authResponse) return authResponse;

  await connectToDatabase();

  const { id } = await req.json();

  const video = await Video.findById(id);
  if (!video) {
    return NextResponse.json({ message: 'Video not found' }, { status: 404 });
  }

  // Ensure the user is the owner of the video
  if (video.createdBy.toString() !== req.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await video.deleteOne();
  return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 });
}
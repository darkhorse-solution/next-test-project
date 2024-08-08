import { NextResponse } from 'next/server';
import Video from '@/models/Video';
import connectToDatabase from '@/lib/mongoose';
import requireAuth from '@/middleware/requireAuth';
import { IUser } from '@/models/User';

interface AuthenticatedRequest extends Request {
  user: IUser;
}

export async function GET(req: Request) {
  await connectToDatabase();

  const videos = await Video.find({});
  return NextResponse.json(videos, { status: 200 });
}

export async function POST(req: Request) {
  const authReq = req as AuthenticatedRequest;
  await connectToDatabase();

  if (!authReq.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, publishYear, link } = await req.json();

  const video = new Video({
    title,
    publishYear,
    link,
    createdBy: authReq.user._id,
  });

  await video.save();
  return NextResponse.json(video, { status: 201 });
}

export default requireAuth; // Apply the authentication middleware to the POST route

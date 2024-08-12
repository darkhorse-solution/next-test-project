import { NextRequest, NextResponse } from 'next/server';
import Video from '@/models/Video';
import connectToDatabase from '@/lib/mongoose';

export async function GET(req: NextRequest) {  
  await connectToDatabase();

  // Parse query parameters
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  // Fetch paginated videos
  const videos = await Video.find({})
    .skip(skip)
    .limit(limit);

  // Get the total number of documents
  const totalDocuments = await Video.countDocuments({});
  const totalPages = Math.ceil(totalDocuments / limit);

  // Return paginated results with metadata
  // console.log(videos)
  return NextResponse.json({
    videos,
    pagination: {
      totalDocuments,
      totalPages,
      currentPage: page,
      pageSize: limit,
    },
  }, { status: 200 });
}

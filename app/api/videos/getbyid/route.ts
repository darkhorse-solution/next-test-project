import { NextRequest, NextResponse } from 'next/server';
import Video from '@/models/Video';
import connectToDatabase from '@/lib/mongoose';

export async function GET(req: NextRequest) {  
  await connectToDatabase();

  // Parse query parameters
  const url = new URL(req.url);
  const _id = url.searchParams.get('id');  
  // Calculate the number of documents to skip
  
  const onevideo = await Video.findById(_id)  
    if(onevideo._id) {
        return NextResponse.json(onevideo, { status: 200 });
    }  
    else {
        return NextResponse.json('nodata', { status: 404 });
    }
}

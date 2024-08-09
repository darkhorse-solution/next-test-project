import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface DeleteRequest {
  videoPath: string;
}

export const POST = async (req: NextRequest) => {
  const { videoPath }: DeleteRequest = await req.json();
  const fullPath = path.join(process.cwd(), 'public', videoPath);

  try {
    fs.unlinkSync(fullPath);
    return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete the video' }, { status: 500 });
  }
};

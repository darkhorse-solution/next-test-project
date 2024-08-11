import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary.config";
import fs from "fs/promises";
import path from "path";
import connectToDatabase from "@/lib/mongoose";
import Video from "@/models/Video";
import { skip } from "node:test";

// Disable the body parser to handle form-data
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10gb', // Adjust the size limit as needed
    },
  },
};


export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    // Get the data from the form
    const formData = await req.formData();
    const file = formData.get("video") as File;
    const title = formData.get("title") as string;
    const publishYear = formData.get("publishYear") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the file as a buffer
    const buffer = await file.arrayBuffer();
    console.log(buffer, file.name);
    
    const tempPath = path.resolve(process.cwd(), "tmp", `_${Date.now()}` + file.name );

    // Write the buffer to a temporary file
    await fs.writeFile(tempPath, Buffer.from(buffer));

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, { resource_type: 'video' });
    // await cloudinary.uploader.upload_large(tempPath, {
    //   resource_type: "video",
    //   folder: "test",
    //   chunk_size: 7000000,
    //   unique_filename: true
    // });

    // Delete the temporary file
    await fs.unlink(tempPath);
    console.log('deleted temp file', result);
    
    const videoUrl = result.secure_url;
    console.log(videoUrl);
    await Video.create({
      title,
      publishYear,
      videoUrl: videoUrl
    });

    return NextResponse.json({ url: videoUrl });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const limit = req.nextUrl.searchParams.get("limit") || 10;
  const skip = req.nextUrl.searchParams.get("skip") || 0;

  const video = await Video.find({}, { limit, skip }); 
  return NextResponse.json({ success: true, data: video });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const id = body._id;
  delete body._id;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ success: false, error: "Video not found" }, { status: 404 });
    }
    await Video.updateOne({ _id: id }, body);
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

// Delete a video
export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const id = req.nextUrl.searchParams.get("id");
  try {
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ success: false, error: "Video not found" }, { status: 404 });
    }
    await Video.deleteOne({ _id: id });
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}


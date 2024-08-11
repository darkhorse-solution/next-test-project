import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary.config";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import path from "path";

// Configure multer
const upload = multer({ dest: "/tmp" });
const uploadMiddleware = upload.single("video");

// Convert multer to a Promise-based function
const useMiddleware = promisify(uploadMiddleware);

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle multipart/form-data
  },
};

export async function POST(req: any) {
  try {
    console.log('ok')
    
    // Create a temporary directory if it doesn't exist
    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Apply the middleware to handle file uploads
    const formData = await useMiddleware(req as any, {} as any);

    const file = (req as any).file;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const { title, publishYear } = req.body;

    // Upload the video to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
      folder: "your_folder_name", // Optional: folder name in Cloudinary to store your files
    });

    // Cleanup: remove the file from the temporary directory
    fs.unlinkSync(file.path);

    const videoUrl = result.secure_url;

    return NextResponse.json({ url: videoUrl, title, publishYear });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import Video from '@/models/Video';
import connectToDatabase from '@/lib/mongoose';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request, res: Response) {
    try {
      const { image, title, publishYear } = await req.json(); // Expecting base64 image, title, and publishYear
      // console.log(image)
      const result = await cloudinary.v2.uploader.upload(image, {
        public_title: `${title}-${publishYear}`, // Use ID and publishYear for the public ID
        overwrite: true, // Overwrite if the ID already exists
      });
      // console.log(result)

      // res.status(200).json({ url: result.secure_url });
      const link = result.secure_url;
      await connectToDatabase();
      const newVideo = new Video({title, publishYear, link})
      // console.log(newVideo)
      await newVideo.save();
      return NextResponse.json("Successfully added", {status: 200})
    } catch (error) {
      return NextResponse.json('Failed upload', { status: 500 });
    }
  
}

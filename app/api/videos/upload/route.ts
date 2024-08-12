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
      const { image, title, publishYear, _id, imageUrl } = await req.json(); // Expecting base64 image, title, and publishYear
      let link = "";
      // console.log(image)
      if (image) {
        const result = await cloudinary.v2.uploader.upload(image, {
          public_title: `${title}-${publishYear}`, // Use ID and publishYear for the public ID
          overwrite: true, // Overwrite if the ID already exists
        });      
  
        // res.status(200).json({ url: result.secure_url });
        link = result.secure_url;
      }
      else {
        link = imageUrl;
      }
      
      await connectToDatabase();
      if(_id) {
        const vid = await Video.findById(_id);
        vid.title = title;
        vid.publishYear = publishYear;
        vid.link = link;
        vid.save();
      }
      else {
        const newVideo = new Video({title, publishYear, link})      
        await newVideo.save();      
      }      
      
      return NextResponse.json("Successfully added", {status: 200})
    } catch (error) {
      return NextResponse.json('Failed upload', { status: 500 });
    }

    // Read the file as a buffer
    const buffer = await file.arrayBuffer();
    console.log(buffer, file.name);
    
    const tempPath = path.resolve(process.cwd(), "tmp", `_${Date.now()}` + file.name );

    // Write the buffer to a temporary file
    await fs.writeFile(tempPath, Buffer.from(buffer));

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, { resource_type: 'video' });
    
    // Delete the temporary file
    await fs.unlink(tempPath);
    
    const link = result.secure_url;
    await Video.create({
      title,
      publishYear,
      link,
      createdBy
    });

    return NextResponse.json({ url: videoUrl });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const limit = req.nextUrl.searchParams.get("page") || 0;
  const skip = req.nextUrl.searchParams.get("skip") || 0;

  const video = await Video.find({}, { limit, skip }); 
  return NextResponse.json({ success: true, data: video });
}

export async function PUT(req: AuthenticatedRequest) {
  const authResponse = authMiddleware(req);    
  if (authResponse) return authResponse;

  await connectToDatabase();

  const formData = await req.formData();
  const id = formData.get("id") as string;
  const file = formData.get("video") as File;
  const title = formData.get("title") as string;
  const publishYear = formData.get("publishYear") as string;
  const createdBy = req.user?.id;
  const body: any = {title, publishYear};

  const video = await Video.findById(id);

  if (!video) {
    return NextResponse.json({ success: false, error: "Video not found" }, { status: 404 });
  }
  if (video.createdBy !== createdBy) {
    return NextResponse.json({ success: false, error: "You are not authorized to edit this video" }, { status: 401 });
  }
  
  if (file) {
    const buffer = await file.arrayBuffer();
    const tempPath = path.resolve(process.cwd(), "tmp", `_${Date.now()}` + file.name );

    // Write the buffer to a temporary file
    await fs.writeFile(tempPath, Buffer.from(buffer));

    // Upload to Cloudinary
    // const result = await cloudinary.uploader.upload(tempPath, { resource_type: 'video' });
    const result = await cloudinary.uploader.upload_large(tempPath, {
      resource_type: "video",
      folder: "test",
      chunk_size: 7000000,
      unique_filename: true
    });

    // Delete the temporary file
    await fs.unlink(tempPath);
    console.log('deleted temp file', result);
    
    const videoUrl = result.secure_url;
    body.link = videoUrl;
    console.log(videoUrl);
  }

  try {
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


import { NextApiRequest, NextApiResponse } from 'next';
import requireAuth from '../../../middleware/requireAuth';
import connectToDatabase from '../../../lib/mongoose';
import Video from '../../../models/Video';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  // Your protected route logic here

  if (req.method === 'GET') {
    const videos = await Video.find({});
    return res.status(200).json(videos);
  }

  if (req.method === 'POST') {
    const { title, publishYear, link } = req.body;
    const video = new Video({ title, publishYear, link });
    await video.save();
    return res.status(201).json(video);
  }

  if (req.method === 'PUT') {
    const { title, publishYear, link } = req.body;
    const video = await Video.findOneAndUpdate({ _id: req.body._id }, { title, publishYear, link }, { new: true });
    return res.status(200).json(video);
  }

  if (req.method === 'DELETE') {
    const video = await Video.findByIdAndDelete(req.body._id);
    return res.status(200).json(video);
  }

  return res.status(405).end();
}

export default requireAuth(handler);

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../utils/auth';
import User from '../models/User';
import connectToDatabase from '../lib/mongoose';

export default function requireAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = verifyToken(token);
      await connectToDatabase();
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized', error });
    }
  };
}

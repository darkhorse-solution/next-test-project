import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/mongoose';
import User from '../../../models/User';
import { generateToken } from '../../../utils/auth';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
}

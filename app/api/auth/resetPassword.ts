import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import connectToDatabase from '../../../lib/mongoose';
import User from '../../../models/User';
import { hashPassword } from '../../../utils/auth';

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectToDatabase();

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with that email does not exist' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send email to the user with the reset token (implementation not shown)
    // ...

    return res.status(200).json({ message: 'Password reset token sent to email' });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing password reset', error });
  }
}

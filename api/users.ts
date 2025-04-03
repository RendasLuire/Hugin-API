import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from './db';
import { User } from './models';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const users = await User.find();
    return res.json(users);
  }
  
  if (req.method === 'POST') {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
  }
  
  res.status(405).json({ message: 'Method Not Allowed' });
}

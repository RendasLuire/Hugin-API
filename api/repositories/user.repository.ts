import connectToDatabase from "../lib/mongodb";
import { User } from "../models/User.model";
import { UserData } from "../types/user.type";

export const getUserCount = async (): Promise<number> => {
    await connectToDatabase();
  const count = await User.countDocuments();
  return count;
}


export const createUser = async (userData: Partial<UserData>) => {
  await connectToDatabase();
  const user = new User(userData);
  return await user.save();
}
import { User } from "../models/User.model";
import { UserInputData } from "../types/user.type";

export const getUserCount = async (): Promise<number> => {
  const count = await User.countDocuments();
  return count;
}

export const createUser = async (userData: Partial<UserInputData>) => {
  const user = new User(userData);
  return await user.save();
}

export const getAdminUser = async () => {

  const adminUser = await User.findOne({ role: "admin" });

  return adminUser;
}

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export const getAllUsers = async () => {
  const users = await User.find().select("-passwordHash");
  return users;
}

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    return {}
  }
  return user;
}

export const deleteUserById = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
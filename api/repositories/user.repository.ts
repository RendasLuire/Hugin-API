import { User } from "../models/User.model";
import { BaseUserDTO, UserCreateDTO } from "../types/user.type";

export const getUserCount = async (): Promise<number> => {
  const count = await User.countDocuments();
  return count;
}

export const createUser = async (userData: Partial<UserCreateDTO>) => {
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

export const getUserByEmail = async (
  email: string
): Promise<BaseUserDTO | null> => {
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return null;
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    passwordHash: user.passwordHash
  };
};


export const deleteUserById = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
import { 
  createUser, 
  deleteUserById, 
  getAdminUser, 
  getAllUsers, 
  getUserByEmail as getUserByEmailRepository, 
  getUserById
} from "../repositories/user.repository";
import { BaseUserDTO, UserCreateDTO } from "../types/user.type";
import bcrypt from "bcryptjs";
import { deleteUserData, loadNewUserData } from "./userSetup.service";


export const createAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@example.com"
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUserExist = await getAdminUser();

  if (adminUserExist) {
    return false;
  }

  const adminUser: UserCreateDTO = {
    name: "Admin",
    email,
    password: hashedPassword,
    role: "admin",
  }

  const newUser = await createUser(adminUser);

  if(!newUser) {
    return false
  }

  return newUser;
}

export const getUsersList = async () => {
  try {
    const allUsers = await getAllUsers();

    return allUsers

  } catch (error) {
    throw new Error("Error returning users list");
  }
}

export const getInfoUserById = async (userId: string) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("Error retrieving user by ID");
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await getUserByEmailRepository(email);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error retrieving user by email");
  }
}

export const createNewUser = async (userData: UserInputData) => {
  try {
  userData.passwordHash = await bcrypt.hash(userData.passwordHash as string, 10);

    const newUser = await createUser(userData);

    if (!newUser) {
      throw new Error("Error creating user");
    }

    
    await loadNewUserData(newUser._id.toString());

    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}

export const existingUser = async (email: string) => {
  try {
    const user = await getUserByEmail(email);
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Error checking existing user");
  }
}

export const updateUser = async (userId: string, userData: Partial<UserInputData>) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found"); 
    }


    Object.assign(user, userData);
    return await user.save();
  } catch (error) {
    throw new Error("Error updating user");
  }
}

export const deleteUserInfo = async (userId: string) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userDeleted =  await deleteUserById(userId);

    await deleteUserData(userId);
    return userDeleted;
  } catch (error) {
    throw new Error("Error deleting user");
  }
}
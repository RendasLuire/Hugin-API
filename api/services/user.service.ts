import { createUser, getAdminUser, getAllUsers, getUserById} from "../repositories/user.repository";
import { UserInputData } from "../types/user.type";
import bcrypt from "bcryptjs";


export const createAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@example.com"
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUserExist = await getAdminUser();

  if (adminUserExist) {
    return false;
  }

  const adminUser: UserInputData = {
    name: "Admin",
    email,
    passwordHash: hashedPassword,
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

export const createNewUser = async (userData: UserInputData) => {
  try {
    console.log("Creating new user with data:", userData);
    userData.passwordHash = await bcrypt.hash(userData.passwordHash, 10);

    const newUser = await createUser(userData);
    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}

export const existingUser = async (email: string) => {
  try {
    const user = await getUserByEmail(email);
    if (user && user.email === email) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Error checking existing user");
  }
}
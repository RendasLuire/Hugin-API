import { createUser, getAdminUser, getAllUsers, getUserByEmail, getUserById} from "../repositories/user.repository";
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
userData.passwordHash = await bcrypt.hash(userData.passwordHash as string, 10);

    const newUser = await createUser(userData);
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

    if (userData.passwordHash) {
      userData.passwordHash = await bcrypt.hash(userData.passwordHash as string, 10);
    }

    Object.assign(user, userData);
    return await user.save();
  } catch (error) {
    throw new Error("Error updating user");
  }
}
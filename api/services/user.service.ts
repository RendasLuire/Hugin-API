import { createUser, getAdminUser} from "../repositories/user.repository";
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

  return newUser;
}


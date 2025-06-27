import { UserData } from "../types/user.type";

export interface AdminUserData extends UserData {
  name: "Admin",
  email: "admin@example.com",
  passwordHash: hashedPassword,
  role: "admin",
}
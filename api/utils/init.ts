import connectToDatabase from "../lib/mongodb";
import { User } from "../models/User.model";
import bcrypt from "bcryptjs";

export async function initializeSystem() {
  await connectToDatabase();

  const existingUsers = await User.find();
  if (existingUsers.length > 0) {
    console.log("Users already exist. Skipping initialization.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created successfully.");
}

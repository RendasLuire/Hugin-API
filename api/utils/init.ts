import connectToDatabase from "../lib/mongodb";
import { User } from "../models/User.model";
import { AccountType } from "../models/AccountType.model";
import bcrypt from "bcryptjs";
import { createInitUserData } from "./users";
import { accountTypes } from "../data/accountType.data";

export async function initializeSystem() {
  await connectToDatabase();

  //TODO Use repository funtion to check if users exist
  const existingUsers = await User.find();
  if (existingUsers.length > 0) {
    console.log("Users already exist. Skipping initialization.");
    return;
  }

  //TODO Use repository funtion to check if account types exist
  const existingAccountTypes = await AccountType.find();
  if (existingAccountTypes.length > 0) {
    console.log("Account types already exist. Skipping initialization.");
    return;
  }

  for (const type of accountTypes) {
    //TODO Use repository function to create account types
    await AccountType.create({
      name: type.name,
      description: type.description,
      key: type.key,
      icon: type.icon,
      color: type.color,
    });
  }
  console.log("Account types initialized successfully.");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  //TODO Use repository function to create the initial user
  const initUser = await User.create({
    name: "Admin",
    email: "admin@example.com",
    passwordHash: hashedPassword,
    role: "admin",
  });
  console.log("Admin user created successfully.");

  await createInitUserData(initUser._id);


}

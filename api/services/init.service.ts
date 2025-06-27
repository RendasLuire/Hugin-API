import connectToDatabase from "../lib/mongodb";
import { AccountType } from "../models/AccountType.model";
import bcrypt from "bcryptjs";
import { createInitUserData } from "../utils/users";
import { accountTypes } from "../data/accountType.data";
import { createUser, getUserCount } from "../repositories/user.repository";

export const initializeSystem = async () => {
  await connectToDatabase();

  const existingUsers = await getUserCount();
  if (existingUsers > 0) {
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

  const initUser = {
    name: "Admin",
    email: "admin@example.com",
    passwordHash: hashedPassword,
    role: "admin",
  };

  const newUser = await createUser(initUser);

  console.log("Admin user created successfully.");

  await createInitUserData(newUser._id);
}
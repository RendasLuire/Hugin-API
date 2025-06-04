import connectToDatabase from "../lib/mongodb";
import { Account } from "../models/Account.model";

export async function createInitUserData(userId: string) {

  await connectToDatabase();
  const existingAccounts = await Account.find({ userId });
  
  if (existingAccounts.length > 0) {
    console.log("Accounts already exist for this user. Skipping initialization.");
    return;
  }
  await Account.create({
    userId,
    name: "Cámara Primigenia",
    accountTypeId: "defaultAccountTypeId",
    balance: 0,
    limit: 0,
    nextPay: 0,
    cutDay: 1,
    payDay: 27, 
  })

  console.log("Initial user data created successfully.");


}
import connectToDatabase from "../lib/mongodb";
import { Types } from "mongoose";
import { Account } from "../models/Account.model";
import { AccountType } from "../models/AccountType.model";
import { Bank } from "../models/Bank.model";

export async function createInitUserData(userId: Types.ObjectId) {

  await connectToDatabase();
  //TODO Use repository function to check if user exists
  const existingAccounts = await Account.find({ userId });

  if (existingAccounts.length > 0) {
    console.log("Accounts already exist for this user. Skipping initialization.");
    return;
  }

  //TODO Use repository function to check if account type exists
  const accountType = await AccountType.findOne({key: "primigenius"});
  if (!accountType) {
    console.error("Account type 'primigenius' not found. Cannot create initial account.");
    return;
  }

  //TODO Use repository function to check if bank exists
  const initBank = await Bank.create({
    userId,
    name: "Testamento"
  });

  //TODO Use repository function to create initial account
  await Account.create({
    userId,
    name: "Arca Primordial",
    accountTypeId: accountType._id,
    bankId: initBank._id,
    balance: 0,
    limit: 0,
    nextPay: 0,
    cutDay: 1,
    payDay: 27, 
  })

  console.log("Initial user data created successfully.");


}

export async function deleteUserData(userId: Types.ObjectId) {
  await connectToDatabase();
  
  //TODO Use repository function to delete account data
  await Account.deleteMany({ userId });

  //TODO Use repository function to delete bank data
  await Bank.deleteMany({ userId });

  console.log("User data deleted successfully.");
}
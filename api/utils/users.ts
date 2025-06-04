import connectToDatabase from "../lib/mongodb";
import { Types } from "mongoose";
import { Account } from "../models/Account.model";
import { AccountType } from "../models/AccountType.model";
import { Bank } from "../models/Bank.model";

export async function createInitUserData(userId: Types.ObjectId) {

  await connectToDatabase();
  const existingAccounts = await Account.find({ userId });

  if (existingAccounts.length > 0) {
    console.log("Accounts already exist for this user. Skipping initialization.");
    return;
  }

  const accountType = await AccountType.findOne({key: "primigenius"});
  if (!accountType) {
    console.error("Account type 'primigenius' not found. Cannot create initial account.");
    return;
  }

  const initBank = await Bank.create({
    userId,
    name: "Testamento"
  });

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
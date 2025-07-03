import connectToDatabase from "../lib/mongodb";
import { Bank } from "../models/Bank.model";

export const createBank = async (bankData: Object) => {
  await connectToDatabase();
  const bank = new Bank(bankData)
  const newBank = await bank.save();
  return newBank;
}

export const deleteBankByUserId = async (userId: string) => {
  await connectToDatabase();
  const result = await Bank.deleteMany({ userId });
  return result;
}
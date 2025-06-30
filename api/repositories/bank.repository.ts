import connectToDatabase from "../lib/mongodb";
import { Bank } from "../models/Bank.model";
import { BankInputData } from "../types/bank.type";

export const createBank = async (bankData: Object) => {
  await connectToDatabase();
  const bank = new Bank(bankData)
  const newBank = await bank.save();
  return newBank;
}
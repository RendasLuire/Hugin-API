import { Bank } from "../models/Bank.model";

export const createBank = async (bankData: Object) => {
  const bank = new Bank(bankData)
  const newBank = await bank.save();
  return newBank;
}

export const deleteBankByUserId = async (userId: string) => {
  const result = await Bank.deleteMany({ userId });
  return result;
}
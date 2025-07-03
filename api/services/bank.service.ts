import { createBank, deleteBankByUserId } from "../repositories/bank.repository";
import { ObjectId } from "mongodb";

export const createDefaultBank = async (userId: string) => {
  const initialBankData = {
    userId: new ObjectId(userId),
    name: "Testamento"
  }

  const newBank =  await createBank(initialBankData);

  return newBank;
}

export const deleteBankByUser = async (userId: string) => {
  const response = await deleteBankByUserId(userId);

  return response;
}
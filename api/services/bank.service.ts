import { createBank } from "../repositories/bank.repository";
import { ObjectId } from "mongodb";

export const createDefaultBank = async (userId: string) => {
  const initialBankData = {
    userId: new ObjectId(userId),
    name: "Testamento"
  }

  await createBank(initialBankData);
}
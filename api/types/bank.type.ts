import { InferSchemaType, ObjectId } from "mongoose";
import { BankSchema } from "../models/Bank.model";

export type BankData = InferSchemaType<typeof BankSchema>;
export type BankInputData = Omit<BankData, "createdAt" | "updatedAt" | "userId"> & {
  userId: string | ObjectId;
};

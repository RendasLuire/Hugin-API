import { InferSchemaType } from "mongoose";
import { AccountSchema } from "../models/Account.model";


export type AccountData = InferSchemaType<typeof AccountSchema>;

export type AccountInputData = Omit<
  AccountData,
  | "createdAt"
  | "updatedAt">
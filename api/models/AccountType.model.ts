import { Schema, model, Types } from "mongoose";

const AccountTypeSchema = new Schema({
  name: { type: String, required: true }
});

export const AccountType = model("AccountType", AccountTypeSchema);

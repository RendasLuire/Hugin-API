import { Schema, model, Types } from "mongoose";

const BankSchema = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },
  country: { type: String }
});

export const Bank = model("Bank", BankSchema);

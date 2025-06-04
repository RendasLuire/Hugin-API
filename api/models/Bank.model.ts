import { Schema, model, Types } from "mongoose";

const BankSchema = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const Bank = model("Bank", BankSchema);

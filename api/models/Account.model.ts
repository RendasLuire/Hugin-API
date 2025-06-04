import { Schema, model, Types } from "mongoose";

const AccountSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  bankId: { type: Types.ObjectId, ref: "Bank" },
  name: { type: String, required: true },
  accountTypeId: { type: Types.ObjectId, ref: "AccountType", required: true },
  balance: { type: Number, default: 0 },
  limit: { type: Number, default: 0 },
  nextPay: { type: Number, default: 0 },
  cutDay: { type: Number },
  payDay: { type: Number }   
}, { timestamps: true });

export const Account = model("Account", AccountSchema);

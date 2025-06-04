import { Schema, model } from "mongoose";

const AccountTypeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    key: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, default: null },
    color: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export const AccountType = model("AccountType", AccountTypeSchema);

import { Schema, model, Types } from "mongoose";

const BankSchema = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, default: "" },
  state: {type: String, enum: ['active', 'archived', 'deleted'], default: "active"},
  deletedAt: { type: Date, default: null },
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const Bank = model("Bank", BankSchema);

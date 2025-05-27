import { Schema, model, Types } from "mongoose";

const MovementSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  accountId: { type: Types.ObjectId, ref: "Account", required: true },
  movementTypeId: { type: Types.ObjectId, ref: "MovementType", required: true },
  categoryId: { type: Types.ObjectId, ref: "Category" },
  description: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

export const Movement = model("Movement", MovementSchema);

import { Schema, model, Types } from "mongoose";

const BudgetSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  categoryId: { type: Types.ObjectId, ref: "Category", required: true },
  amount: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  periodId: { type: Types.ObjectId, ref: "Period", required: true }
}, { timestamps: true });

export const Budget = model("Budget", BudgetSchema);

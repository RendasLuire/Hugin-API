import { Schema, model, Types } from "mongoose";

const PeriodSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, { timestamps: true });

export const Period = model("Period", PeriodSchema);

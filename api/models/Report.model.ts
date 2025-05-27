import { Schema, model, Types } from "mongoose";

const ReportSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["monthly", "category", "summary"], required: true },
  filters: { type: Schema.Types.Mixed },
  generatedAt: { type: Date, default: Date.now },
  content: { type: Schema.Types.Mixed }
});

export const Report = model("Report", ReportSchema);

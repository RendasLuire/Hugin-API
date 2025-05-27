import { Schema, model, Types } from "mongoose";

const SuggestionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["warning", "tip", "alert"], required: true },
  relatedTo: { type: String }, // "budget", "spending", "movement"
  generatedAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export const Suggestion = model("Suggestion", SuggestionSchema);

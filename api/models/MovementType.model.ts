import { Schema, model, Types } from "mongoose";

const MovementTypeSchema = new Schema({
  name: { type: String, required: true }
});

export const MovementType = model("MovementType", MovementTypeSchema);

import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "user"], 
    default: "user"
  },
}, { 
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.passwordHash;
      return ret;
    }
  },
  toObject: {
    transform(doc, ret) {
      delete ret.passwordHash;
      return ret;
    }
  }
 });

export const User = model("User", UserSchema);

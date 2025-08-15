import { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<IUser>({
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

export const User = model<IUser>("User", UserSchema);

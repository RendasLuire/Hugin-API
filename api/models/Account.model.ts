import { Schema, model, Types } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  bankId: Types.ObjectId;
  name: string;
  accountTypeId: Types.ObjectId;
  balance: number;
  limit: number;
  nextPay: number;
  state: "active" | "archived" | "deleted";
  deletedAt?: Date | null;
  cutDay?: number;
  payDay?: number;
}

export const AccountSchema = new Schema<IAccount>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bankId: { type: Schema.Types.ObjectId, ref: "Bank" },
  name: { type: String, required: true },
  accountTypeId: { type: Schema.Types.ObjectId, ref: "AccountType", required: true },
  balance: { type: Number, default: 0 },
  limit: { type: Number, default: 0 },
  nextPay: { type: Number, default: 0 },
  state: { type: String, enum: ["active", "archived", "deleted"], default: "active" },
  deletedAt: { type: Date, default: null },
  cutDay: { type: Number },
  payDay: { type: Number }
}, { timestamps: true });

export const Account = model<IAccount>("Account", AccountSchema);

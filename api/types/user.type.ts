import { InferSchemaType } from "mongoose";
import { UserSchema } from "../models/User.model";

export type UserData = InferSchemaType<typeof UserSchema>;
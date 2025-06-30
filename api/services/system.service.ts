import { createInitUserData } from "../utils/users";
import { createAdminUser } from "./user.service";
import { defineDefaultAccountTypes } from "./accountType.service";

export const initializeSystem = async () => {
  await defineDefaultAccountTypes()

  const newUser = await createAdminUser();

  await createInitUserData(newUser._id);
}
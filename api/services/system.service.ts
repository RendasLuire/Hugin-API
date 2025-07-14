import { createAdminUser } from "./user.service";
import { defineDefaultAccountTypes } from "./accountType.service";
import { loadNewUserData } from "./userSetup.service";

export const initializeSystem = async () => {
  await defineDefaultAccountTypes()

  // TODO Register Default Category Type

  const newUser = await createAdminUser();

  const stringUserId = newUser._id.toString();
  await loadNewUserData(stringUserId);
}
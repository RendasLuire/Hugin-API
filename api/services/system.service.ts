import { createAdminUser } from "./user.service";
import { defineDefaultAccountTypes } from "./accountType.service";
import { loadNewUserData } from "./userSetup.service";

export const initializeSystem = async () => {
  const accountTypes = await defineDefaultAccountTypes()

  if(!accountTypes) return false
  
  // TODO Register Default Category Type
  
  const newUser = await createAdminUser();
  
  if(!newUser) return false

  const stringUserId = newUser._id.toString();
  const newUserData = await loadNewUserData(stringUserId);

  if(!newUserData) return false

  return true
}
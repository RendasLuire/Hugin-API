import { accountTypes } from "../data/accountType.data";
import { createAccountType, getAccountTypeByKey, getAccountTypeCount } from "../repositories/accountType.repository";

export const defineDefaultAccountTypes = async () => {

  const existingAccountTypes = await getAccountTypeCount();
  if (existingAccountTypes > 0) {
    return false;
  }

  for(const type of accountTypes) {
    await createAccountType(type);
  }

  return true
}

export const checkPrimigeniusAccountType = async () => {

  const primigeniusType = await getAccountTypeByKey("primigenius");
  if (!primigeniusType) {
    return false;
  }
  
  return primigeniusType;
}
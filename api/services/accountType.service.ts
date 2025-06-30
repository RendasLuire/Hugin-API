import { accountTypes } from "../data/accountType.data";
import { createAccountType, getAccountTypeByKey, getAccountTypeCount } from "../repositories/accountType.repository";

export const defineDefaultAccountTypes = async () => {

  const existingAccountTypes = await getAccountTypeCount();
  if (existingAccountTypes > 0) {
    console.log("Account types already exist. Skipping initialization.");
    return;
  }

  for(const type of accountTypes) {
    await createAccountType(type);
  }

  console.log("Account types initialized successfully.");
}

export const checkPrimigeniusAccountType = async () => {

  const primigeniusType = await getAccountTypeByKey("primigenius");
  if (!primigeniusType) {
    console.error("Primigenius account type not found. Please define default account types first.");
    return false;
  }
  
  return true;
}
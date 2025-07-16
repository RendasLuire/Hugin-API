import { checkPrimigeniusAccountType } from "./accountType.service";
import { createDefaultBank, deleteBankByUser } from "./bank.service";
import { createInitialAccount, deleteAccountsByUser } from "./account.service";
import { getUserById } from "../repositories/user.repository";


export const loadNewUserData = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  const primigeniusType = await checkPrimigeniusAccountType();

  if (!primigeniusType) {
    return false;
  }

  const initialBankData = await createDefaultBank(userId);

  if (!initialBankData) {
    return false;
  }

  const initialAccount = await createInitialAccount(user._id, primigeniusType._id, initialBankData._id);

  if (!initialAccount) {
    return false;
  }

  return true
}

export const deleteUserData = async (userId: string) => {

  try {
    await deleteAccountsByUser(userId)
    await deleteBankByUser(userId);
  
    return true
  } catch (error) {
    return false
  }

}
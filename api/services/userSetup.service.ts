import { checkPrimigeniusAccountType } from "./accountType.service";
import { createDefaultBank, deleteBankByUser } from "./bank.service";
import { createInitialAccount, deleteAccountsByUser } from "./account.service";
import { getUserById } from "../repositories/user.repository";


export const loadNewUserData = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    console.error("User not found. Cannot load new user data.");
    return;
  }

  const primigeniusType = await checkPrimigeniusAccountType();

  if (!primigeniusType) {
    console.error("Primigenius account type not found. Cannot load new user data.");
    return;
  }

  const initialBankData = await createDefaultBank(userId);

  if (!initialBankData) {
    console.error("Failed to create initial bank data. Cannot load new user data.");
    return;
  }

  const initialAccount = await createInitialAccount(user._id, primigeniusType._id, initialBankData._id);

  if (!initialAccount) {
    console.error("Failed to create initial account. Cannot load new user data.");
    return;
  }
}

export const deleteUserData = async (userId: string) => {
  await deleteAccountsByUser(userId)

  await deleteBankByUser(userId);

  console.log("User data deleted successfully.");
}
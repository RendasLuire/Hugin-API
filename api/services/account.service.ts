import { Types } from "mongoose";
import { getTestAccounts, getAccountsByUserId, createAccount, deleteAccountsByUserId, updateAccount } from "../repositories/account.repository";

export const testAccounts = () => {
  const accounts = getTestAccounts();
  return {
      data: accounts,
      message: "Test Accounts endpoint is working.",
    }
}

export const getAccountsForUser = async (userId: string) => {
  const accounts = await getAccountsByUserId(userId);

  return accounts;
}

export const createInitialAccount = async (userId: Types.ObjectId ,accountTypeId: Types.ObjectId, bankId: Types.ObjectId) => {
  const initialAccountData = {
    userId,
    name: "Arca Primordial",
    accountTypeId,
    bankId,
    balance: 0,
    limit: 0,
    nextPay: 0,
    cutDay: 1,
    payDay: 27, 
  };

  const newAccount = await createAccount(initialAccountData);

  return newAccount;
}

export const updateAccountData = async (accountId: string, updateData: Object) => {
  const updatedAccount = await updateAccount(accountId, updateData);

  return updatedAccount;
}

export const deleteAccountsByUser = async (userId: string) => {
  const response = await deleteAccountsByUserId(userId);

  return response
}
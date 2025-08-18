import { getTestAccounts, getAccountsByUserId, createAccount, deleteAccountsByUserId, updateAccount } from "../repositories/account.repository";
import { AccountCreateDTO, AccountUpdateDTO } from "../types/account.type";

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

export const createInitialAccount = async (data: AccountCreateDTO) => {
  const initialAccountData = {
    userId: data.userId,
    name: "Arca Primordial",
    accountTypeId: data.accountTypeId,
    bankId: data.bankId,
    balance: 0,
    limit: 0,
    nextPay: 0,
    cutDay: 1,
    payDay: 27, 
  };

  const newAccount = await createAccount(initialAccountData);

  return newAccount;
}

export const updateAccountData = async (accountId: string, updateData: AccountUpdateDTO) => {
  const updatedAccount = await updateAccount(accountId, updateData);

  return updatedAccount;
}

export const deleteAccountsByUser = async (userId: string) => {
  const response = await deleteAccountsByUserId(userId);

  return response
}
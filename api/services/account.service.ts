import { getTestAccounts, getAccountsByUserId } from "../repositories/account.repository";

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
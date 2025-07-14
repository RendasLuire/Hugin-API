import { Account } from '../models/Account.model';

export const getTestAccounts = () => {
  return [
    {
        name: "Test Account",
        balance: 1000,
        accountType: "Savings",
    },
  ];
}

export const getAccountsByUserId = async (userId: string) => {
    const accounts = await Account.find({ userId, state: "active" })
      .select('-__v -userId -updatedAt -state -deletedAt')
      .populate({
        path: 'bankId',
        select: 'name logoUrl'
      })
      .populate({
        path: 'accountTypeId',
        select: 'name key icon color'
      });

    return accounts;
}

export const createAccount = async (accountData: Object) => {
    const account = new Account(accountData);
    const newAccount = await account.save();
    return newAccount;
}

export const deleteAccountsByUserId = async (userId: string) => {
    const result = await Account.deleteMany({ userId });
    return result;
}
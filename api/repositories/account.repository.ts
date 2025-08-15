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

export const updateAccount = async (accountId: string, updateData: Object) => {
  const accountToUpdate = await Account.findById(accountId);

  if (!accountToUpdate) {
    throw new Error('Account not found');
  }

  Object.assign(accountToUpdate, updateData);
  const updatedAccount = await accountToUpdate.save();

  if(!updatedAccount) {
    throw new Error('Error updating account');
  }

  return updatedAccount;
}

export const deleteAccountsByUserId = async (userId: string) => {
    const result = await Account.deleteMany({ userId });
    return result;
}
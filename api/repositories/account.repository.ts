import { Account } from '../models/Account.model';
import connectToDatabase from '../lib/mongodb';

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
    await connectToDatabase();
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

//TODO: Implement the function to get account by id.

//TODO: Implement the function to create a new account.

//TODO: Implement the function to update an account by id.

//TODO: Implement the function to delete an account by id.
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
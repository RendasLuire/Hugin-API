import connectToDatabase from "../lib/mongodb"
import { AccountType } from "../models/AccountType.model"
import { AccountTypeData } from "../types/accountType.type"


export const createAccountType = async (accountTypeData: AccountTypeData) => {

  const newAccountType = new AccountType(accountTypeData)
  await newAccountType.save()

  return newAccountType
}

export const getAccountTypeCount = async () => {

  const count = await AccountType.countDocuments()
  return count
}

export const getAccountTypeByKey = async (key: string) => {

  const accountType = await AccountType.findOne({ key })
  return accountType
}
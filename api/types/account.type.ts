import { IAccount } from "../models/Account.model";


export type BaseAccountDTO = Omit<IAccount, "createdAt" | "updatedAt" | "deletedAt">;

export type AccountCreateDTO = Omit<
  BaseAccountDTO,
  "_id" | "balance" | "limit" | "nextPay" | "cutDay" | "payDay"
> & {
  userId: string;
  accountTypeId: string;
  bankId: string;
};

export type AccountUpdateDTO = Partial<
  Pick<BaseAccountDTO, "name" | "balance" | "limit" | "nextPay" | "cutDay" | "payDay">
> & {
  state?: "active" | "archived" | "deleted";
  deletedAt?: Date | null;
};

export type AccountResponseDTO = Omit<BaseAccountDTO, "userId" | "bankId" | "accountTypeId"> & {
  userId: string;
  bankId: string;
  accountTypeId: string;
};

export type AccountListResponseDTO = {
  accounts: AccountResponseDTO[];
  total: number;
  page: number;
  limit: number;
};
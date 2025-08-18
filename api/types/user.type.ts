import { IUser } from "../models/User.model";

export type BaseUserDTO = Omit<IUser, "createdAt" | "updatedAt">;

export type UserCreateDTO = Omit<BaseUserDTO, "_id" | "passwordHash" | "role"> & {
  password: string,
  role?: string;
};

export type UserUpdateDTO = Partial<Pick<BaseUserDTO, "name" | "email">> & {
  password?: string;
};

export type UserResponseDTO = Omit<BaseUserDTO, "passwordHash">;

export interface UserListResponseDTO {
  users: UserResponseDTO[];
  total: number;
  page: number;
  limit: number;
}

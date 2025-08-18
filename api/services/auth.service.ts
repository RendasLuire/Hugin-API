import { UserLoginDTO } from "../types/auth.type";
import { BaseUserDTO, UserCreateDTO } from "../types/user.type";
import { getUserByEmail } from "./user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const testAuthentication = () => {
  return {
    message: "Authentication service is working",
    status: "success",
  };
}

export const generateTokens = async (user: BaseUserDTO) => {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET
      || "secreto",
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET
      || "secreto",
    { expiresIn: "7d" }
  );

  return {
    accessToken,
    refreshToken,
  };
}

export const loginUser = async (data: UserLoginDTO) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user:BaseUserDTO = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  if (!accessToken || !refreshToken) {
    throw new Error("Error generating tokens");
  }

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}

export const refreshAccessToken = async (token: string) => {
  if (!token) {
    throw new Error("Refresh token is required");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secreto") as { userId: string; email: string };

     const user = await getUserByEmail(payload.email);

    if (!user) {
      throw new Error("User not found");
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return {
      accessToken,
      refreshToken,
    };

  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

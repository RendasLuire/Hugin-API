import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { existingUser } from "../services/user.service";
import { loginUser as loginUserService, refreshAccessToken, testAuthentication as testAuthenticationService } from "../services/auth.service";

export const testAuthentication = async (req: Request, res: Response) => {
  const data = await testAuthenticationService()

  res.status(200).json(
    data,
  );
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      data: {},
      message: "Fields email and password are required",
    });
    return
  }
  try {
    const userExist = await existingUser(email);

    if (!userExist) {
      res.status(404).json({
        data: {},
        message: "User not found",
      });
      return
    }

    const userSession = await loginUserService({ email, password });
    
    res.status(202).cookie("refreshToken", userSession.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).json({
      data: userSession,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error during login",
      error 
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401).json({
      data: {},
      message: "No refresh token provided"
    });

    return
  }

  try {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshAccessToken(token);

    res.status(202).cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({
      data:{
        accessToken: newAccessToken
      },
      message: "Access token refreshed successfully",
    });
    return
  } catch {
    res.status(401).json({
      data: {},
      message: "Invalid or expired refresh token" 
    });
    return
  }
};

export const logout = (req: Request, res: Response) => {
 try{ res.status(202).clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  }).json({
    data: {},
    message: "Logout successful.",
  });
  return
} catch (error) {
    res.status(500).json({
      data: {},
      message: "Error during logout",
      error
    });
    return
}
}
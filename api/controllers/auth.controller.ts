import { Request, Response } from "express";
import { User } from "../models/User.model";
import connectToDatabase from "../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    await connectToDatabase();
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      res.status(401).json({
        data: {},
        message: "User incorrect",
      });
      return
    }
    const isValid = await bcrypt.compare(password, user?.passwordHash as string);

    if (!isValid) {
      res.status(401).json({
        data: {},
        message: "Password incorrect",
      });
      return
    }
    
    const accessToken = jwt.sign(
      { userId: user?._id, email: user?.email },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET || "secreto", { expiresIn: "7d" });

    res.status(202).cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).json({
      data: {
        accessToken, 
        user: {
          name: user?.name,
          email: user?.email,
        } 
      },
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

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401).json({
      data: {},
      message: "No refresh token provided"
    });

    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secreto") as { userId: string; email: string };

    const newAccessToken = jwt.sign(
      { userId: payload.userId, email: payload.email },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { userId: payload.userId, email: payload.email },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "7d" }
    );

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
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({
      data: [],
      message: "No authorization header provided",
    });
    return
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secreto") as JwtPayload;
    (req as any).user = { id: payload.userId, email: payload.email };
     next();
  } catch (error) {
     res.status(401).json({
      data: [],
      message: "Invalid or expired token",
    });
    return
  }
};
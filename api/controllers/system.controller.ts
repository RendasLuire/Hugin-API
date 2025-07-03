import { Request, Response } from "express";
import { initializeSystem } from "../services/system.service";

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    data: [],
    message: "Express on Vercel with TS",
  });
};

export const initializeApp = async (req: Request, res: Response) => {
  await initializeSystem();
  res.status(200).json({
    data: [],
    message: "app initialized",
  });
};
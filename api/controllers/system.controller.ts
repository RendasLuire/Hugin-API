import { Request, Response } from "express";
import { initializeSystem } from "../services/system.service";

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    data: [],
    message: "Express on Vercel with TS.",
  });
};

export const initializeApp = async (req: Request, res: Response) => {

  try {
    const result = await initializeSystem();

    if(!result){
      res.status(200).json({
        data:[],
        message: "System has been initialized."
      })
    }

    res.status(202).json({
      data: [],
      message: "App initialized.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error: ", error
    })
  }
};
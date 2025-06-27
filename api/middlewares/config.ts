import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const registerMiddlewares = (app: express.Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
};
import express from "express";
import usersRoutes from "../routes/user.router";
import authRoutes from "../routes/auth.router";
import accountRoutes from "../routes/account.router";
import accountTypeRoutes from "../routes/accountType.router";
import bankRoutes from "../routes/bank.router";
import systemRoutes from "../routes/system.router";

export const registerRoutes = (app: express.Application) => {
  app.use("/", systemRoutes);
  app.use("/accounts", accountRoutes);
  app.use("/users", usersRoutes);
  app.use("/auth", authRoutes);
  app.use("/account-types", accountTypeRoutes);
  app.use("/banks", bankRoutes);
}
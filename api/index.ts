import express from "express";
import cookieParser from 'cookie-parser';
import usersRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";
import accountRoutes from "./routes/account.router";
import accountTypeRoutes from "./routes/accountType.router";
import bankRoutes from "./routes/bank.router";
import { initializeSystem } from "./utils/init"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors()); 
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Express on Vercel with TS");
});

app.get("/initialize", async (req, res) => {
  await initializeSystem()
  res.send("app initialized");
});

app.use("/accounts", accountRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/account-types", accountTypeRoutes);
app.use("/banks", bankRoutes);

export default app;

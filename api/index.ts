import express from "express";
import usersRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";
import { initializeSystem } from "./utils/init"

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Express on Vercel with TS");
});

app.get("/initialize", async (req, res) => {
  await initializeSystem()
  res.send("app initialized");
});

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

export default app;

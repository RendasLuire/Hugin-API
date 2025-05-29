import express from "express";
import usersRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel with TS");
});

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

export default app;

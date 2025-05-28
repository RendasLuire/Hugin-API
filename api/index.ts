import dotenv from "dotenv";
import express from "express";
import usersRoutes from "./routes/users";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel with TS");
});

app.use("/users", usersRoutes);

export default app;

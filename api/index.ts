import express from "express";
import usersRoutes from "./routes/users";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel with TS");
});

app.use("/users", usersRoutes);

export default app;

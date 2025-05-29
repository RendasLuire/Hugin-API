import express from "express";
import usersRoutes from "./routes/user.router";
import authRoutes from "./routes/auth.router";
import { initializeSystem } from "./utils/init";

const app = express();
app.use(express.json());

initializeSystem()
  .then(() => {
    console.log("System initialization complete.");

    app.get("/", (req, res) => {
      res.send("Express on Vercel with TS");
    });

    app.use("/users", usersRoutes);
    app.use("/auth", authRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize system:", err);
  });

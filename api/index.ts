import express from "express";
import { registerRoutes } from "./routes/registerRoutes";
import { registerMiddlewares } from "./middlewares/config";
import connectToDatabase from "./lib/mongodb";

const app = express();

connectToDatabase()

registerMiddlewares(app);
registerRoutes(app);

export default app;

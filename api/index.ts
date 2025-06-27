import express from "express";
import { registerRoutes } from "./routes/registerRoutes";
import { registerMiddlewares } from "./middlewares/config";

const app = express();

registerMiddlewares(app);
registerRoutes(app);

export default app;

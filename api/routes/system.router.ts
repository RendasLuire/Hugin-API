import { Router } from "express";
import { healthCheck, initializeApp } from "../controllers/system.controller";

const router = Router();

router.get("/", healthCheck);

router.get("/initialize", initializeApp);

export default router;
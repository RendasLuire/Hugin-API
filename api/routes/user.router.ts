import { Router } from "express";
import {
  testUsers,
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  deleteUser,
} from "../controllers/user.controller";
import { 
  authMiddleware
 } from "../middlewares/auth";

const router = Router();

router.get("/test", testUsers);
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", authMiddleware, createUser);
router.put("/:id", authMiddleware, updateUserInfo);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
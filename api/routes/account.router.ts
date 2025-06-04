import { Router } from "express";
import { 
  testAccounts,
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount
 } from "../controllers/account.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
router.get("/test", testAccounts);
router.get("/", authMiddleware, getAccounts);
router.get("/:id", authMiddleware, getAccountById);
router.post("/", authMiddleware, createAccount);
router.put("/:id", authMiddleware, updateAccount);
router.delete("/:id", authMiddleware, deleteAccount);

export default router;
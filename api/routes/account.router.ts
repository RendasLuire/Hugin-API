import { Router } from "express";
import { 
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  testAccountsController
 } from "../controllers/account.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
router.get("/test", testAccountsController);
router.get("/", authMiddleware, getAccounts);
router.get("/:id", authMiddleware, getAccountById);
router.post("/", authMiddleware, createAccount);
router.put("/:id", authMiddleware, updateAccount);
router.delete("/:id", authMiddleware, deleteAccount);

export default router;
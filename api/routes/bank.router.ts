import { Router } from 'express';
import {
  testBanks,
  getBanks,
  getBankById,
  createBank,
  updateBank,
  deleteBank
} from '../controllers/bank.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
router.get('/test', testBanks);
router.get('/', authMiddleware, getBanks);
router.get('/:id', authMiddleware, getBankById);
router.post('/', authMiddleware, createBank);
router.put('/:id', authMiddleware, updateBank);
router.delete('/:id', authMiddleware, deleteBank);

export default router;
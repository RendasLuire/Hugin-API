import { Router } from 'express';
import { 
  testAccountTypes,
  getAccountTypes,
  getAccountTypeById,
  createAccountType,
  updateAccountType,
  deleteAccountType
} from '../controllers/accountType.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
router.get('/test', testAccountTypes);
router.get('/', authMiddleware, getAccountTypes);
router.get('/:id', authMiddleware, getAccountTypeById);
router.post('/', authMiddleware, createAccountType);
router.put('/:id', authMiddleware, updateAccountType);
router.delete('/:id', authMiddleware, deleteAccountType);

export default router;
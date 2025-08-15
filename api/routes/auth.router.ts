import  { Router } from 'express';
import { login, refreshToken, logout, testAuthentication } from '../controllers/auth.controller';

const router = Router();

router.get("/test", testAuthentication)
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
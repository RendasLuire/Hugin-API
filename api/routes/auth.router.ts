import  { Router } from 'express';
import { login, refreshToken, logout } from '../controllers/auth.controller';

const router = Router();

router.get("/test", (req, res) => {
  res.json({
    data: {},
    message: "Auth test route is working",
    });
  })

router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
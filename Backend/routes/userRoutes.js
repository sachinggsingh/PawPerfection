import { Router } from 'express';
const router = Router();
import { createUser, loginUSer, logoutUSer, refreshToken, getProfile } from '../controllers/userCTRL';
import auth from '../middleware/auth.js';

// Public routes
router.post('/register', createUser);
router.post('/login', loginUSer);
router.post('/logout', logoutUSer);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/profile', auth, getProfile);

export default router
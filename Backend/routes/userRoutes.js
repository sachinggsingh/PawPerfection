import { Router } from 'express';
const router = Router();
import { createUser, loginUSer, logoutUSer, refreshToken, getProfile, googleAuthCallback } from '../controllers/userCTRL';
import auth from '../middleware/auth.js';
import passport from 'passport';

// Public routes
router.post('/register', createUser);
router.post('/login', loginUSer);
router.post('/logout', logoutUSer);
router.post('/refresh-token', refreshToken);



// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthCallback
);

// Protected routes
router.get('/profile', auth, getProfile);

export default router
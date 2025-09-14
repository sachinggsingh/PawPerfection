import { Router } from 'express';
import { createPayment, getPayment, getUserPayments, verifyPayment, testStripe } from '../controllers/payment.js';
// import { testEmail } from '../controllers/emailTest.js';
import auth from '../middleware/auth.js';

const router = Router();

// Payment routes
router.post('/create-payment', auth, createPayment);
router.get('/payment/:paymentId', auth, getPayment);
router.get('/user-payments', auth, getUserPayments);
router.post('/verify-payment', auth, verifyPayment);

// Test routes (remove in production)
router.get('/test-stripe', auth, testStripe);
// router.post('/test-email', testEmail);

export default router;

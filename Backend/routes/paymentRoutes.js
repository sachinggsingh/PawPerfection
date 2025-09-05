import { Router } from 'express';
import { createPayment, getPayment } from '../controllers/payment.js';
import { testEmail } from '../controllers/emailTest.js';
import auth from '../middleware/auth.js';

const router = Router();

// Payment routes
router.post('/create-payment', auth, createPayment);
router.get('/payment/:paymentId', auth, getPayment);

// Test email route (remove in production)
router.post('/test-email', testEmail);

export default router;

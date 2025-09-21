import express from 'express';
import { testLoginEmail, testPaymentConfirmationEmail, testPaymentCancellationEmail, testAllEmails, testEmailConfiguration } from '../controllers/emailTest.js';

const router = express.Router();

// Test email configuration
router.get('/test-config', testEmailConfiguration);

// Test login notification email
router.post('/test-login', testLoginEmail);

// Test payment confirmation email
router.post('/test-payment-confirmation', testPaymentConfirmationEmail);

// Test payment cancellation email
router.post('/test-payment-cancellation', testPaymentCancellationEmail);

// Test all emails at once
router.post('/test-all', testAllEmails);

export default router;

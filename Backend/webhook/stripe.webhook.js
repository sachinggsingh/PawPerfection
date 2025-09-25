import express from 'express';
import { stripe } from '../utils/payment.js';
import Payment from '../models/payment.js';
import Training from '../models/trainingProgram.js';
import User from '../models/user.js';
import { sendPaymentConfirmationEmail, sendPaymentCancellationEmail ,sendSessionExpiredForPayment} from '../utils/emailService.js';

const router = express.Router();

// Health check endpoint for webhook
router.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Webhook endpoint is healthy',
        timestamp: new Date().toISOString()
    });
});

// Test endpoint to send payment confirmation email
router.post('/test-payment-email', async (req, res) => {
    try {
        const { userEmail, userName, courseTitle, courseWeek, courseId, amount, paymentId } = req.body;
        
        if (!userEmail) {
            return res.status(400).json({ error: 'userEmail is required' });
        }

        console.log('Testing payment confirmation email to:', userEmail);

        await sendPaymentConfirmationEmail({
            userEmail: userEmail,
            userName: userName || userEmail.split('@')[0],
            courseTitle: courseTitle || 'Test Course',
            courseWeek: courseWeek || 1,
            courseId: courseId || 'test-course-id',
            amount: amount || 100,
            paymentId: paymentId || 'test-payment-id',
            paymentDate: new Date()
        });

        res.json({ 
            success: true, 
            message: 'Payment confirmation email sent successfully',
            userEmail: userEmail
        });
    } catch (error) {
        console.error('Test payment email error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Test endpoint to send payment cancellation email
router.post('/test-cancellation-email', async (req, res) => {
    try {
        const { userEmail, userName, courseTitle, courseWeek, amount, reason } = req.body;
        
        if (!userEmail) {
            return res.status(400).json({ error: 'userEmail is required' });
        }

        console.log('Testing payment cancellation email to:', userEmail);

        await sendPaymentCancellationEmail({
            userEmail: userEmail,
            userName: userName || userEmail.split('@')[0],
            courseTitle: courseTitle || 'Test Course',
            courseWeek: courseWeek || 1,
            amount: amount || 100,
            reason: reason || 'Test cancellation'
        });

        res.json({ 
            success: true, 
            message: 'Payment cancellation email sent successfully',
            userEmail: userEmail
        });
    } catch (error) {
        console.error('Test cancellation email error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Debug endpoint to manually trigger webhook events (for testing)
router.post('/debug-trigger', async (req, res) => {
    try {
        const { sessionId, eventType } = req.body;
        
        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        console.log(`Manually triggering ${eventType || 'checkout.session.completed'} for session:`, sessionId);

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Manually trigger the appropriate handler
        switch (eventType || 'checkout.session.completed') {
            case 'checkout.session.completed':
                await handlePaymentSuccess(session);
                break;
            case 'checkout.session.expired':
                await handlePaymentExpired(session);
                break;
            default:
                return res.status(400).json({ error: 'Invalid event type' });
        }

        res.json({ 
            success: true, 
            message: `Manually triggered ${eventType || 'checkout.session.completed'}`,
            sessionId: sessionId
        });
    } catch (error) {
        console.error('Debug trigger error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Stripe webhook endpoint
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    console.log('Webhook endpoint hit - Headers:', req.headers);
    console.log('Webhook endpoint hit - Body length:', req.body?.length);
    
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
        console.error('STRIPE_WEBHOOK_SECRET is not defined');
        return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('Received Stripe event:', event.type, event.data.object.id);

    } catch (err) {
        console.error(`Webhook signature verification failed:`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                await handlePaymentSuccess(event.data.object);
                break;
            case 'checkout.session.expired':
                await handlePaymentExpired(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;
            case 'payment_intent.canceled':
                await handlePaymentCanceled(event.data.object);
                break;
            case 'payment_intent.succeeded':
                await handlePaymentIntentSucceeded(event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).json({ error: 'Webhook handler failed' });
    }
});

// Handle successful payment
async function handlePaymentSuccess(session) {
    try {
        console.log('Payment successful for session:', session.id);
        
        // Find the payment record using multiple possible identifiers
        let payment = await Payment.findOne({ paymentId: session.id })
            .populate('userId')
            .populate('trainingProgramId');

        // If not found by paymentId, try by paymentOrderId
        if (!payment) {
            payment = await Payment.findOne({ paymentOrderId: session.id })
                .populate('userId')
                .populate('trainingProgramId');
        }

        if (!payment) {
            console.error('Payment record not found for session:', session.id);
            return;
        }

        // Update payment status
        const updatedPayment = await Payment.findByIdAndUpdate(payment._id, {
            status: 'completed',
            paymentStatus: 'completed',
            paymentMethod: session.payment_method_types?.[0] || 'card',
            paymentOrderId: session.id,
            paymentCurrency: session.currency?.toUpperCase() || 'INR',
            paymentDate: new Date()
        }, { new: true });

        // Send confirmation email
        try {
            await sendPaymentConfirmationEmail({
                userEmail: payment.userId.email,
                userName: payment.userId.name || payment.userId.email.split('@')[0],
                courseTitle: payment.trainingProgramId.title,
                courseWeek: payment.trainingProgramId.week,
                courseId: payment.trainingProgramId._id,
                amount: payment.price,
                paymentId: payment._id,
                paymentDate: new Date()
            });
            console.log('Payment confirmation email sent to:', payment.userId.email);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the webhook if email fails
        }

        console.log('Payment successfully processed:', payment._id);
    } catch (error) {
        console.error('Error handling payment success:', error);
        throw error; // Re-throw to trigger webhook retry
    }
}

// Handle expired payment session
async function handlePaymentExpired(session) {
    try {
        console.log('Payment session expired for session:', session.id);

        let payment = await Payment.findOne({ paymentId: session.id })
            .populate('userId')
            .populate('trainingProgramId');

        // If not found by paymentId, try by paymentOrderId
        if (!payment) {
            payment = await Payment.findOne({ paymentOrderId: session.id })
                .populate('userId')
                .populate('trainingProgramId');
        }

        if (!payment) {
            console.error('Payment record not found for expired session:', session.id);
            return;
        }
        try{
            await sendSessionExpiredForPayment({
                userEmail: payment.userId.email,
                userName: payment.userId.name || payment.userId.email.split('@')[0],
                courseTitle: payment.trainingProgramId.title,
                courseWeek: payment.trainingProgramId.week,
                amount: payment.price,
                reason: 'Payment session expired'
            });
            console.log('Session expired email sent to:', payment.userId.email);
        }catch(emailError){
            console.error('Failed to send session expired email:', emailError);
        }

        // Update payment status
        await Payment.findByIdAndUpdate(payment._id, {
            status: 'expired',
            paymentStatus: 'expired',
            paymentOrderId: session.id,
            paymentCurrency: session.currency?.toUpperCase() || 'INR'
        });

        // Send cancellation email
        try {
            await sendPaymentCancellationEmail({
                userEmail: payment.userId.email,
                userName: payment.userId.name || payment.userId.email.split('@')[0],
                courseTitle: payment.trainingProgramId.title,
                courseWeek: payment.trainingProgramId.week,
                amount: payment.price,
                reason: 'Payment session expired'
            });
            console.log('Payment expiration email sent to:', payment.userId.email);
        } catch (emailError) {
            console.error('Failed to send expiration email:', emailError);
        }

        console.log('Payment expiration processed:', payment._id);
    } catch (error) {
        console.error('Error handling payment expiration:', error);
        throw error; // Re-throw to trigger webhook retry
    }
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent) {
    try {
        console.log('Payment failed for payment intent:', paymentIntent.id);

        const payment = await Payment.findOne({
            $or: [
                { paymentOrderId: paymentIntent.id },
                { paymentId: paymentIntent.id }
            ]
        }).populate('userId').populate('trainingProgramId');

        if (!payment) {
            console.error('Payment record not found for failed payment intent:', paymentIntent.id);
            return;
        }

        // Update payment status
        await Payment.findByIdAndUpdate(payment._id, {
            status: 'failed',
            paymentStatus: 'failed',
            paymentOrderId: paymentIntent.id,
            paymentCurrency: paymentIntent.currency?.toUpperCase() || 'INR'
        });

        // Send cancellation email
        try {
            await sendPaymentCancellationEmail({
                userEmail: payment.userId.email,
                userName: payment.userId.name || payment.userId.email.split('@')[0],
                courseTitle: payment.trainingProgramId.title,
                courseWeek: payment.trainingProgramId.week,
                amount: payment.price,
                reason: 'Payment failed'
            });
            console.log('Payment failure email sent to:', payment.userId.email);
        } catch (emailError) {
            console.error('Failed to send failure email:', emailError);
        }

        console.log('Payment failure processed:', payment._id);
    } catch (error) {
        console.error('Error handling payment failure:', error);
        throw error; // Re-throw to trigger webhook retry
    }
}

// Handle canceled payment
async function handlePaymentCanceled(paymentIntent) {
    try {
        console.log('Payment canceled for payment intent:', paymentIntent.id);

        const payment = await Payment.findOne({
            $or: [
                { paymentOrderId: paymentIntent.id },
                { paymentId: paymentIntent.id }
            ]
        }).populate('userId').populate('trainingProgramId');

        if (!payment) {
            console.error('Payment record not found for canceled payment intent:', paymentIntent.id);
            return;
        }

        // Update payment status
        await Payment.findByIdAndUpdate(payment._id, {
            status: 'canceled',
            paymentStatus: 'canceled',
            paymentOrderId: paymentIntent.id,
            paymentCurrency: paymentIntent.currency?.toUpperCase() || 'INR'
        });

        // Send cancellation email
        try {
            await sendPaymentCancellationEmail({
                userEmail: payment.userId.email,
                userName: payment.userId.name || payment.userId.email.split('@')[0],
                courseTitle: payment.trainingProgramId.title,
                courseWeek: payment.trainingProgramId.week,
                amount: payment.price,
                reason: 'Payment canceled by user'
            });
            console.log('Payment cancellation email sent to:', payment.userId.email);
        } catch (emailError) {
            console.error('Failed to send cancellation email:', emailError);
        }

        console.log('Payment cancellation processed:', payment._id);
    } catch (error) {
        console.error('Error handling payment cancellation:', error);
        throw error; // Re-throw to trigger webhook retry
    }
}

// Handle payment intent succeeded (alternative to checkout.session.completed)
async function handlePaymentIntentSucceeded(paymentIntent) {
    try {
        console.log('Payment intent succeeded:', paymentIntent.id);

        const payment = await Payment.findOne({
            $or: [
                { paymentOrderId: paymentIntent.id },
                { paymentId: paymentIntent.id }
            ]
        }).populate('userId').populate('trainingProgramId');

        if (!payment) {
            console.error('Payment record not found for payment intent:', paymentIntent.id);
            return;
        }

        // Only update if not already completed
        if (payment.status !== 'completed') {
            await Payment.findByIdAndUpdate(payment._id, {
                status: 'completed',
                paymentStatus: 'completed',
                paymentOrderId: paymentIntent.id,
                paymentCurrency: paymentIntent.currency?.toUpperCase() || 'INR',
                paymentDate: new Date()
            });

            // Send confirmation email
            try {
                await sendPaymentConfirmationEmail({
                    userEmail: payment.userId.email,
                    userName: payment.userId.name || payment.userId.email.split('@')[0],
                    courseTitle: payment.trainingProgramId.title,
                    courseWeek: payment.trainingProgramId.week,
                    courseId: payment.trainingProgramId._id,
                    amount: payment.price,
                    paymentId: payment._id,
                    paymentDate: new Date()
                });
                console.log('Payment confirmation email sent to:', payment.userId.email);
            } catch (emailError) {
                console.error('Failed to send confirmation email:', emailError);
            }
        }

        console.log('Payment intent successfully processed:', payment._id);
    } catch (error) {
        console.error('Error handling payment intent success:', error);
        throw error; // Re-throw to trigger webhook retry
    }
}

export default router;

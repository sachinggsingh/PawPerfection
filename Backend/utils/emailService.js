import nodemailer from 'nodemailer';
import User from '../models/user.js';

const createTransporter = () => {
    // Validate environment variables
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        throw new Error('SMTP_EMAIL and SMTP_PASSWORD environment variables are required');
    }

    console.log('Creating email transporter with:', {
        email: process.env.SMTP_EMAIL,
        hasPassword: !!process.env.SMTP_PASSWORD
    });

    return nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.SMTP_EMAIL, 
            pass: process.env.SMTP_PASSWORD 
        }
    });
};

console.log("Email service initialized.");

// Email templates
const getConfirmationEmailTemplate = (data) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation - PawPerfection</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #4CAF50;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #4CAF50;
                margin-bottom: 10px;
            }
            .success-icon {
                font-size: 48px;
                color: #4CAF50;
                margin: 20px 0;
            }
            .course-details {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #4CAF50;
            }
            .amount {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐾 PawPerfection</div>
                <div class="success-icon">✅</div>
                <h1>Payment Confirmed!</h1>
            </div>
            
            <p>Dear ${data.userName},</p>
            
            <p>Great news! Your payment has been successfully processed and your course enrollment is now confirmed.</p>
            
            <div class="course-details">
                <h3>Course Details:</h3>
                <p><strong>Course:</strong> ${data.courseTitle}</p>
                <p><strong>Week:</strong> ${data.courseWeek}</p>
                <p><strong>Payment Date:</strong> ${data.paymentDate.toLocaleDateString()}</p>
                <p><strong>Payment ID:</strong> ${data.paymentId}</p>
            </div>
            
            <div class="amount">
                Amount Paid: ₹${data.amount}
            </div>
            
            <p>You can now access your course content and start your dog training journey with us!</p>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/course/${data.courseId}" class="button">
                    Access Your Course
                </a>
            </div>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            
            <div class="footer">
                <p>Thank you for choosing PawPerfection!</p>
                <p>Best regards,<br>The PawPerfection Team</p>
                <p><small>This is an automated email. Please do not reply to this message.</small></p>
            </div>
        </div>
    </body>
    </html>
    `;
};
const getCancellationEmailTemplate = (data) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Update - PawPerfection</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #ff6b6b;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #ff6b6b;
                margin-bottom: 10px;
            }
            .warning-icon {
                font-size: 48px;
                color: #ff6b6b;
                margin: 20px 0;
            }
            .course-details {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #ff6b6b;
            }
            .amount {
                font-size: 24px;
                font-weight: bold;
                color: #ff6b6b;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐾 PawPerfection</div>
                <div class="warning-icon">⚠️</div>
                <h1>Payment Update</h1>
            </div>
            
            <p>Dear ${data.userName},</p>
            
            <p>We wanted to inform you about an update regarding your recent payment attempt.</p>
            
            <div class="course-details">
                <h3>Course Details:</h3>
                <p><strong>Course:</strong> ${data.courseTitle}</p>
                <p><strong>Week:</strong> ${data.courseWeek}</p>
                <p><strong>Amount:</strong> ₹${data.amount}</p>
                <p><strong>Reason:</strong> ${data.reason}</p>
            </div>
            
            <p>Unfortunately, your payment could not be processed at this time. This could be due to various reasons such as insufficient funds, card expiration, or network issues.</p>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/courses" class="button">
                    Try Again
                </a>
            </div>
            
            <p>If you continue to experience issues, please contact our support team for assistance. We're here to help you get started with your dog training journey!</p>
            
            <div class="footer">
                <p>Thank you for your interest in PawPerfection!</p>
                <p>Best regards,<br>The PawPerfection Team</p>
                <p><small>This is an automated email. Please do not reply to this message.</small></p>
            </div>
        </div>
    </body>
    </html>
    `;
};
const getLoginEmailTemplate = (data) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Alert - PawPerfection</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #4CAF50;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #4CAF50;
                margin-bottom: 10px;
            }
            .info {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #4CAF50;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #ff6b6b;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐾 PawPerfection</div>
                <h1>New Login Alert</h1>
            </div>
            
            <p>Hi ${data.userName},</p>
            <p>We noticed a new login to your PawPerfection account:</p>
            
            <div class="info">
                <p><strong>Date:</strong> ${data.loginDate.toLocaleString()}</p>
                <p><strong>IP Address:</strong> ${data.ip || "Unknown"}</p>
                <p><strong>Device:</strong> ${data.device || "Not detected"}</p>
                <p><strong>Location:</strong> ${data.location || "Not available"}</p>
            </div>
            
            <p>If this was you, no further action is required.</p>
            <p>If you did <strong>not</strong> login, please secure your account immediately by resetting your password.</p>
            
            <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/reset-password" class="button">
                    Reset Password
                </a>
            </div>
            
            <div class="footer">
                <p>Stay safe,<br>The PawPerfection Team</p>
                <p><small>This is an automated email. Please do not reply to this message.</small></p>
            </div>
        </div>
    </body>
    </html>
    `;
};


// Send payment confirmation email
export const sendPaymentConfirmationEmail = async (data) => {
    try {
        console.log('Attempting to send payment confirmation email to:', data.userEmail);
        
        // Validate required data
        if (!data.userEmail) {
            throw new Error('userEmail is required for payment confirmation');
        }

        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: data.userEmail,
            subject: `Payment Confirmed - ${data.courseTitle} | PawPerfection`,
            html: getConfirmationEmailTemplate(data)
        };

        console.log('Sending payment confirmation email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        const result = await transporter.sendMail(mailOptions);
        console.log('Payment confirmation email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending payment confirmation email:', {
            error: error.message,
            stack: error.stack,
            userEmail: data.userEmail,
            courseTitle: data.courseTitle
        });
        throw error;
    }
};
// Send payment cancellation email
export const sendPaymentCancellationEmail = async (data) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: data.userEmail,
            subject: `Payment Update - ${data.courseTitle} | PawPerfection`,
            html: getCancellationEmailTemplate(data)
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Cancellation email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending cancellation email:', error);
        throw error;
    }
};
// Send login notification email
export const sendLoginNotificationEmail = async (data) => {
    try {
        console.log('Attempting to send login notification email to:', data.userEmail);
        
        // Validate required data
        if (!data.userEmail) {
            throw new Error('userEmail is required for login notification');
        }

        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: data.userEmail,
            subject: `New Login Alert | PawPerfection`,
            html: getLoginEmailTemplate(data)
        };

        console.log('Sending email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        const result = await transporter.sendMail(mailOptions);
        console.log('Login notification email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending login email:', {
            error: error.message,
            stack: error.stack,
            userEmail: data.userEmail
        });
        throw error;
    }
};


import nodemailer from 'nodemailer';

// Create transporter for email sending
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // You can change this to your preferred email service
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASSWORD // Your email password or app password
        }
    });
};

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

// Send payment confirmation email
export const sendPaymentConfirmationEmail = async (data) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.userEmail,
            subject: `Payment Confirmed - ${data.courseTitle} | PawPerfection`,
            html: getConfirmationEmailTemplate(data)
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};

// Send payment cancellation email
export const sendPaymentCancellationEmail = async (data) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
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

// Test email function
export const sendTestEmail = async (to, subject, html) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Test email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Error sending test email:', error);
        throw error;
    }
};

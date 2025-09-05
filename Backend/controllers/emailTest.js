import { sendTestEmail } from '../utils/emailService.js';

export const testEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                msg: "Email is required",
                success: false
            });
        }

        const testHtml = `
            <h1>Test Email from PawPerfection</h1>
            <p>This is a test email to verify that the email service is working correctly.</p>
            <p>If you receive this email, the email configuration is successful!</p>
            <p>Time: ${new Date().toLocaleString()}</p>
        `;

        await sendTestEmail(email, "Test Email - PawPerfection", testHtml);

        return res.status(200).json({
            msg: "Test email sent successfully",
            success: true
        });
    } catch (error) {
        console.error('Error sending test email:', error);
        return res.status(500).json({
            msg: "Failed to send test email",
            success: false,
            error: error.message
        });
    }
};

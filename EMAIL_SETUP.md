# Email Setup Guide for PawPerfection

## Issues Fixed

1. **Environment Variable Typo**: Fixed `STMP_EMAIL` to `SMTP_EMAIL` in email service
2. **Login Controller**: Added missing `await` keyword for password comparison
3. **User Name Handling**: Added fallback for users without names in email templates
4. **Email Testing**: Added comprehensive email testing endpoints

## Required Environment Variables

Add these to your `.env` file:

```env
# Email Configuration
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173

# Other existing variables...
MONNGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `SMTP_PASSWORD`

## Email Testing Endpoints

Test your email configuration with these endpoints:

### 1. Test Email Configuration
```bash
GET /api/email-test/test-config
```
This endpoint checks if all required environment variables are set and provides configuration status.

### 2. Test Login Email
```bash
POST /api/email-test/test-login
Content-Type: application/json

{
  "email": "test@example.com"
}
```

### 3. Test Payment Confirmation Email
```bash
POST /api/email-test/test-payment-confirmation
Content-Type: application/json

{
  "email": "test@example.com"
}
```

### 4. Test Payment Cancellation Email
```bash
POST /api/email-test/test-payment-cancellation
Content-Type: application/json

{
  "email": "test@example.com"
}
```

### 5. Test All Emails
```bash
POST /api/email-test/test-all
Content-Type: application/json

{
  "email": "test@example.com"
}
```

## Step-by-Step Testing Guide

### Step 1: Check Configuration
First, verify your email configuration:
```bash
curl http://localhost:5000/api/email-test/test-config
```

Expected response:
```json
{
  "msg": "Email configuration test completed",
  "success": true,
  "configuration": {
    "smtpEmail": "Set",
    "smtpPassword": "Set",
    "frontendUrl": "Set",
    "nodeEnv": "development"
  },
  "transporterTest": "Environment variables available",
  "recommendations": []
}
```

### Step 2: Test Individual Email Types
Test each email type individually:

```bash
# Test login email
curl -X POST http://localhost:5000/api/email-test/test-login \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@gmail.com"}'

# Test payment confirmation
curl -X POST http://localhost:5000/api/email-test/test-payment-confirmation \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@gmail.com"}'

# Test payment cancellation
curl -X POST http://localhost:5000/api/email-test/test-payment-cancellation \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@gmail.com"}'
```

### Step 3: Test Real-time Email Triggers
After confirming test emails work, test real-time triggers:

1. **Login Email**: Try logging in with a user account
2. **Payment Emails**: Complete a payment flow through Stripe
3. **Check Server Logs**: Monitor console output for email sending status

### Step 4: Monitor Server Logs
Watch your server console for detailed email logs:
```
Creating email transporter with: { email: 'your-email@gmail.com', hasPassword: true }
Attempting to send login notification email to: user@example.com
Sending email with options: { from: 'your-email@gmail.com', to: 'user@example.com', subject: 'New Login Alert | PawPerfection' }
Login notification email sent successfully: <message-id>
```

## Email Triggers

### Login Notifications
- Triggered on successful user login
- Includes IP address, device info, and timestamp
- Sent to user's registered email

### Payment Success
- Triggered when Stripe webhook confirms payment
- Includes course details and payment information
- Sent to user's registered email

### Payment Failure/Cancellation
- Triggered when payment fails, expires, or is canceled
- Includes reason for failure and retry instructions
- Sent to user's registered email

## Troubleshooting

### Common Issues

1. **"Invalid login" error**:
   - Check SMTP_EMAIL and SMTP_PASSWORD
   - Ensure 2FA is enabled and app password is correct
   - Verify Gmail account has "Less secure app access" disabled (use app password instead)

2. **Emails not sending**:
   - Check server logs for specific error messages
   - Verify environment variables are loaded correctly
   - Test with email test endpoints first

3. **"Authentication failed" errors**:
   - Regenerate app password in Gmail
   - Ensure SMTP_PASSWORD is the app password, not your regular password

### Testing Steps

1. Start your backend server
2. Use the email test endpoints to verify configuration
3. Check your email inbox for test messages
4. If tests pass, try actual login/payment flows

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main Gmail password
- Consider using a dedicated email service (SendGrid, Mailgun) for production
- Monitor email sending limits and quotas

## Production Recommendations

For production deployment:

1. **Use dedicated email service**: Consider SendGrid, Mailgun, or AWS SES
2. **Rate limiting**: Implement rate limiting for email sending
3. **Email templates**: Consider using a template service
4. **Monitoring**: Set up email delivery monitoring and alerts
5. **Backup**: Have fallback email providers configured

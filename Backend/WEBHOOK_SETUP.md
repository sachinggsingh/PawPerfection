# Stripe Webhook Setup Guide

## Environment Variables Required

Add these variables to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## Stripe Webhook Setup

1. **Create a Stripe Account** and get your API keys from the Stripe Dashboard

2. **Set up Webhook Endpoint**:
   - Go to Stripe Dashboard > Webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/webhook/stripe-webhook`
   - Events to send:
     - `checkout.session.completed`
     - `checkout.session.expired`
     - `payment_intent.payment_failed`
     - `payment_intent.canceled`

3. **Get Webhook Secret**:
   - After creating the webhook, click on it
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`

## Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

## Testing the Webhook

### Local Development
Use Stripe CLI to forward webhooks to your local server:

```bash
# Install Stripe CLI
# Then run:
stripe listen --forward-to localhost:3000/api/webhook/stripe-webhook
```

### Production
Make sure your webhook URL is accessible from the internet and uses HTTPS.

## Webhook Events Handled

- **checkout.session.completed**: Payment successful
- **checkout.session.expired**: Payment session expired
- **payment_intent.payment_failed**: Payment failed
- **payment_intent.canceled**: Payment canceled

## Email Templates

The system sends two types of emails:

1. **Confirmation Email**: When payment is successful
2. **Cancellation Email**: When payment fails, expires, or is canceled

Both emails include:
- Course details
- Payment information
- User-friendly design
- Action buttons

## API Endpoints

- `POST /api/payment/create-payment` - Create payment session
- `GET /api/payment/payment/:paymentId` - Get payment details
- `POST /api/webhook/stripe-webhook` - Stripe webhook endpoint

## Security Notes

- Webhook signature verification is implemented
- All webhook events are logged
- Email sending includes error handling
- Payment status is updated in database

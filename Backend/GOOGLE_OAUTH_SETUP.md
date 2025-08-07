# Google OAuth Setup Guide

## Backend Setup

### 1. Install Dependencies
```bash
npm install passport-google-oauth20
```

### 2. Environment Variables
Add the following to your `.env` file:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Session Secret (can be same as JWT_SECRET)
SESSION_SECRET=your_session_secret_here
```

### 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen
6. Set the authorized redirect URIs:
   - `http://localhost:5050/api/auth/google/callback` (for development)
   - `https://yourdomain.com/api/auth/google/callback` (for production)
7. Copy the Client ID and Client Secret to your `.env` file

### 4. Frontend Setup

The frontend is already configured to:
- Display a Google sign-in button on the login page
- Handle the OAuth callback at `/auth/callback`
- Store tokens in localStorage and Redux state

### 5. Testing

1. Start the backend server: `npm start`
2. Start the frontend: `cd ../Frontend/client && npm run dev`
3. Navigate to the login page
4. Click "Sign in with Google"
5. Complete the Google OAuth flow
6. You should be redirected back to the app with tokens stored

## Features Implemented

- ✅ Google OAuth strategy configuration
- ✅ Session management with express-session
- ✅ Passport serialization/deserialization
- ✅ JWT token generation for OAuth users
- ✅ Frontend callback handling
- ✅ Token storage in localStorage and Redux
- ✅ Google sign-in button on login page
- ✅ Error handling for failed authentication

## Security Notes

- Tokens are stored securely in localStorage
- Session cookies are httpOnly and secure in production
- Refresh tokens are stored in the database
- Failed authentication redirects to login page with error messages 
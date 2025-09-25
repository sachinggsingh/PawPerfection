import { connect } from 'mongoose';
import express, { json, urlencoded  } from 'express';
const app = express();
import { config } from 'dotenv';
config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './utils/passport.js';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';


// import auth from './middleware/auth';
import userRoutes from './routes/userRoutes.js';
import petRoutes from './routes/petRoute.js';
import trainingRoutes from './routes/trainingRoutes.js';
import feedBackRoutes from './routes/feedBack.js';
import paymentRoutes from './routes/paymentRoutes.js';
import webhookRoutes from './webhook/stripe.webhook.js';
import emailTestRoutes from './routes/emailTest.js';
    


// Check if MONNGODB_URI is defined
if (!process.env.MONNGODB_URI) {
    console.error('MONGO_URL is not defined in environment variables');
    process.exit(1);
}

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

// Check if JWT_REFRESH_SECRET is defined (optional, will use JWT_SECRET if not provided)
if (!process.env.JWT_REFRESH_SECRET) {
    console.warn('JWT_REFRESH_SECRET is not defined, using JWT_SECRET for refresh tokens');
}

// Check if email configuration is defined
if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP_EMAIL or SMTP_PASSWORD is not defined - email functionality will not work');
}

// Check if FRONTEND_URL is defined
if (!process.env.FRONTEND_URL) {
    console.warn('FRONTEND_URL is not defined - email links may not work properly');
}

// Rate Limiter Middleware
const limitter = rateLimiter({
    windowMs: 2 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 2 minutes'
})

// Mount webhook BEFORE body parsers to preserve raw body for signature verification
app.use('/api/webhook', webhookRoutes);

app.use(json());
app.use(helmet());
app.use(urlencoded({ extended: true }));
// app.use(static('public'));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB with error handling
connect(process.env.MONNGODB_URI)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });


app.get("/",(req,res)=>
{
    res.send("Hello World!!!");
})
app.use('/api/auth', userRoutes);
app.use('/api/pet', petRoutes);
app.use('/api/training', trainingRoutes);    
app.use('/api/feedback', feedBackRoutes);
app.use('/api/payment',limitter, paymentRoutes);
app.use('/api/email-test', emailTestRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
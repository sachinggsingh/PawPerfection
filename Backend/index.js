import { connect } from 'mongoose';
import express, { json, urlencoded  } from 'express';
const app = express();
import { config } from 'dotenv';
config();
import cors from 'cors';
import cookieParser from 'cookie-parser';


// import auth from './middleware/auth';
import userRoutes from './routes/userRoutes';
import petRoutes from './routes/petRoute';
// import trainingRoutes from './routes/trainingRoutes';
import feedBackRoutes from './routes/feedBack';



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

app.use(json());
app.use(urlencoded({ extended: true }));
// app.use(static('public'));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));
app.use(cookieParser());

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
// app.use('/api/training', trainingRoutes);    
app.use('/api/feedback', feedBackRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
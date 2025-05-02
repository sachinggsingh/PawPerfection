const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


const auth = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoute');
const trainingRoutes = require('./routes/trainingRoutes');

// Check if MONGO_URL is defined
if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined in environment variables');
    process.exit(1);
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URL)
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


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
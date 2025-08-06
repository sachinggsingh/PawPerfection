import FeedBack from "../models/feedBack.js";

const createFeedBack = async (req, res) => {
    try {
        const { email, message } = req.body;
        if (!email || !message) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Please provide a valid email address" });
        }
        
        if (message.length > 100) {
            return res.status(400).json({ msg: "Message cannot be longer than 100 characters" });
        }
        
        const feedBack = await FeedBack.create({
            email,
            message
        });
        
        return res.status(201).json({
            msg: "Feedback created successfully",
            feedBack: {
                _id: feedBack._id,
                email: feedBack.email,
                message: feedBack.message
            }
        });
    }
    catch (error) {
        console.error("Create feedback error:", error);
        return res.status(500).json({ msg: "Failed to create feedback" });
    }
}

const getFeedBacks = async (req, res) => {
    try {
        const { email } = req.query; // Changed from req.body to req.query for GET request
        
        if (!email) {
            return res.status(400).json({ msg: "Email parameter is required" });
        }
        
        const feedBacks = await FeedBack.find({ email });
        if (!feedBacks || feedBacks.length === 0) {
            return res.status(404).json({ msg: "No feedback found for this email" });
        }
        
        return res.status(200).json({
            msg: "Feedbacks found successfully",
            feedBacks: feedBacks.map(feedback => ({
                _id: feedback._id,
                email: feedback.email,
                message: feedback.message,
                createdAt: feedback.createdAt
            }))
        });
    }
    catch (error) {
        console.error("Get feedbacks error:", error);
        return res.status(500).json({ msg: "Failed to fetch feedbacks" });
    }
}

export default { createFeedBack, getFeedBacks }
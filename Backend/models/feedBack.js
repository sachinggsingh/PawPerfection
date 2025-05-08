const mongoose = require("mongoose");

const feedBack = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model("FeedBack", feedBack);
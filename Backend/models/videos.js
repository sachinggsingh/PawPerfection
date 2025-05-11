const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    url: {
        type: [String],
        required: true,
    },
    resources : {
        type: [String],
        required: true,
        default: null
    },
    price : {
        type: Number,
        required: true,
    }
}, { timestamps: true });        

module.exports = mongoose.model('Video', videoSchema);
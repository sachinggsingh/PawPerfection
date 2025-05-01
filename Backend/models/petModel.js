const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    }
}, { timestamps: true });        

module.exports = mongoose.model('Pet', petSchema);
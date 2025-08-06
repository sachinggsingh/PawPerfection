import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    message: {
        type: String,
        required: true,
        maxlength: 100
    },
}, {
    timestamps: true
});

export default mongoose.model("FeedBack", feedBackSchema);
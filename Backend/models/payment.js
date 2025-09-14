import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    paymentId:{
        type:String,
        required:true,
        default:"pending"
    },
    trainingProgramId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Training",
        required:true
    },
    price:{
        type:Number,
        ref:"Training",
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending",
        enum: ["pending", "completed", "failed", "canceled", "expired", "refunded"]
    },
    paymentOrderId:{
        type:String,
        required:true,
        default:"pending"
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"card",
        enum: ["card", "upi", "netbanking", "wallet", "pending"]
    },
    paymentDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    paymentStatus:{
        type:String,
        required:true,
        default:"pending",
        enum: ["pending", "completed", "failed", "canceled", "expired", "refunded"]
    },
    paymentCurrency:{
        type:String,
        required:true,
        default:"INR",
        enum: ["INR", "USD", "EUR", "GBP"]
    },
}, {
    timestamps: true
})

export default mongoose.model("Payment", paymentSchema)
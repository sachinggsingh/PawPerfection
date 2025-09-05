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
        default:"pending"
    },
    paymentOrderId:{
        type:String,
        required:true,
        default:"pending"
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"pending"
    },
    paymentDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    paymentStatus:{
        type:String,
        required:true,
        default:"pending"
    },
    paymentCurrency:{
        type:String,
        required:true,
        default:"INR"
    },
}, {
    timestamps: true
})

export default mongoose.model("Payment", paymentSchema)
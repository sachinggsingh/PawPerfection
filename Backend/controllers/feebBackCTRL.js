const FeedBack = require("../models/feedBack");

const createFeedBack = async(req,res)=>
{
    try
    {
        const {email,message} = req.body
        if(!email || !message)
            return res.status(400).json({msg:"Please enter all fields"})
        if(message.length > 100)
            return res.status(400).json({msg:"Message cannot be longer than 100 characters"})
        const feedBack = await FeedBack.create({
            email,
            message
        })
        return res.status(200).json({msg:"FeedBack created successfully",feedBack:{_id:feedBack._id,email:feedBack.email,message:feedBack.message}})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to create feedBack"})
    }
}

const getFeedBacks = async(req,res)=>
{
    try
    {
        const {email} = req.body
        const feedBacks = await FeedBack.find({email})
        if(!feedBacks)
            return res.status(400).json({msg:"FeedBacks not found"})
        return res.status(200).json({msg:"FeedBacks found successfully",feedBacks})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to fetch feedBacks"})
    }
}

module.exports = {createFeedBack,getFeedBacks}
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req,res)=>
{
    try{
        const { email, password,confirmPassword} = req.body
        if( !email || !password || !confirmPassword)
        {
            return res.status(400).json({msg:"Please enter all fields"})
        }
        if(password !== req.body.confirmPassword)
        {
            return res.status(400).json({msg:"Passwords do not match"})
        }
        const user = await User.findOne({email})
        if(user)
        {
            return res.status(400).json({msg:"User already exists"})
        }

        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password:hash
        })
        await newUser.save()
        return res.status(200).json({msg:"User registered successfully"})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Account creation Failed"})
    }
}

const loginUSer = async(req,res)=>
{
    try{
        const { email , password} = req.body; 
        if(!email || !password)
        {
            return res.status(400).json({msg:"All fields are required"})
        }
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({msg:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({msg:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        // console.log(token)
        return res.status(200).json({msg:"Login successful",token})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Login Failed"})
    }
}

const logoutUSer = async(req,res)=>
{
    try{
        return res.status(200).clearCookie("token",null,{maxAge:0}).json({msg:"Logout successful"})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Logout Failed"})
    }
}

module.exports = {createUser,loginUSer,logoutUSer}
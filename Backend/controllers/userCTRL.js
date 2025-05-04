const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,{
        expiresIn: "1d",
    });
    return res
      .status(200)
      .json({ msg: "User created successfully", token, user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "User creation failed" });
  }
};

const loginUSer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // console.log(token)
    return res.status(200).json({ msg: "Login successful", token,
      user: {
        id: user._id,
        email: user.email,
      },
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Login Failed" });
  }
};

const logoutUSer = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", null, { maxAge: 0 })
      .json({ msg: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Logout Failed" });
  }
};

module.exports = { createUser, loginUSer, logoutUSer };

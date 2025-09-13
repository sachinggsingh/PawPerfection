import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import { generateTokens, verifyRefreshToken } from "../utils/jwtUtils.js";

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Please provide a valid email address" });
    }
    
    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters long" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);
    
    // Create user first
    const newUser = await User.create({ 
      email, 
      password: hashedPassword
    });
    
    // Generate tokens for the new user
    const { accessToken, refreshToken } = generateTokens(newUser._id);
    
    // Update user with refresh token
    await User.findByIdAndUpdate(newUser._id, { refreshToken: refreshToken });
    
    return res.status(201).json({
      msg: "User created successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({ msg: "User creation failed" });
  }
};

export const loginUSer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    
    // Generate new tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    
    // Update user's refresh token in database
    await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken });
    
    return res.status(200).json({
      msg: "Login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Login failed" });
  }
};

export const logoutUSer = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      // Clear refresh token from database
      const decoded = verifyRefreshToken(refreshToken);
      if (decoded) {
        await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
      }
    }
    
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ msg: "Logout failed" });
  }
};

// Refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ msg: "Refresh token is required" });
    }
    
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ msg: "Invalid refresh token" });
    }
    
    // Check if user exists and token matches
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ msg: "Invalid refresh token" });
    }
    
    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
    
    // Update refresh token in database
    await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });
    
    return res.status(200).json({
      msg: "Token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ msg: "Token refresh failed" });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refreshToken');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    return res.status(200).json({
      msg: "Profile retrieved successfully",
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ msg: "Failed to get profile" });
  }
};

// Google OAuth callback handler
export const googleAuthCallback = async (req, res) => {
  try {
    // User is already authenticated by passport
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ msg: "Authentication failed" });
    }
    
    // Generate JWT tokens for the authenticated user
    const { accessToken, refreshToken } = generateTokens(user._id);
    
    // Update user's refresh token in database
    await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken });
    
    // Redirect to frontend with tokens as URL parameters
    const redirectUrl = `http://localhost:5173/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}&userId=${user._id}&email=${encodeURIComponent(user.email)}`;
    res.redirect(redirectUrl);
    
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    res.redirect('http://localhost:5173/login?error=authentication_failed');
  }
}; 

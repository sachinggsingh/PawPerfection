import jwt from 'jsonwebtoken';
const { verify } = jwt;
import User from '../models/user.js';

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                msg: 'Access denied. No token provided.',
                error: 'NO_TOKEN'
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        if (!token) {
            return res.status(401).json({ 
                msg: 'Access denied. No token provided.',
                error: 'NO_TOKEN'
            });
        }

        // Verify access token
        const decoded = verify(token, process.env.JWT_SECRET);
        
        // Check if user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ 
                msg: 'Token is not valid. User not found.',
                error: 'USER_NOT_FOUND'
            });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                msg: 'Token has expired.',
                error: 'TOKEN_EXPIRED'
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                msg: 'Token is not valid.',
                error: 'INVALID_TOKEN'
            });
        }
        
        return res.status(401).json({ 
            msg: 'Token is not valid.',
            error: 'TOKEN_ERROR'
        });
    }
};

export default auth;

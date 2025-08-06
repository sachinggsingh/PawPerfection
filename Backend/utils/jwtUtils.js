import { sign, verify } from 'jsonwebtoken';

// Generate access token (short-lived)
export const generateAccessToken = (userId) => {
    return sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "15m" // 15 minutes
    });
};

// Generate refresh token (long-lived)
export const generateRefreshToken = (userId) => {
    return sign({ id: userId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: "7d" // 7 days
    });
};

// Verify access token
export const verifyAccessToken = (token) => {
    try {
        return verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
    try {
        return verify(token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Generate both tokens
export const generateTokens = (userId) => {
    return {
        accessToken: generateAccessToken(userId),
        refreshToken: generateRefreshToken(userId)
    };
};

// Check if token is expired
export const isTokenExpired = (token) => {
    try {
        const decoded = verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
    } catch (error) {
        return true;
    }
}; 
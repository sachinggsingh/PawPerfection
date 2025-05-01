const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ msg: 'No authentication token, access denied' });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ msg: 'Token verification failed, authorization denied' });
        }

        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token, authorization denied' });
    }
};

module.exports = auth;
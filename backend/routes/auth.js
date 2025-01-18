const jwt = require('jsonwebtoken');

// Middleware for token authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    jwt.verify(token, "tcmTM", (err, user) => { // Verify token
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user; // Attach the decoded user to the request object
        next(); // Proceed to the next middleware/route
    });
};

module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     // console.log("Auth Middleware: Checking token...");
//     // console.log("Request Headers:", req.headers);
//     if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) return res.status(403).json({ message: 'Invalid token' });

//         req.user = decoded;  // 🔹 Extract user ID and Role
//         next();
//     });
// };







const authenticateToken = (req, res, next) => {
    console.log("Auth Middleware: Checking token...");
    console.log("Request Headers:", req.headers); // Already logged

    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided or invalid format.");
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token part
    console.log("Extracted Token:", token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: "Access Denied: Invalid Token" });
        }

        console.log("Decoded Token:", user); // Expecting { id: 17, role: "admin", iat: ..., exp: ... }
        req.user = user;
        next();
    });
};





















// 🔹 Admin-Only Middleware
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = { authenticateToken, authorizeAdmin };

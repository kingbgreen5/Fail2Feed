// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const User = require('../models/userModel');
// require('dotenv').config();


// const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });





// // Register User with Email Verification
// router.post('/register', async (req, res) => {
//     const { username, email, password, role } = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }
//     const userRole = role === 'admin' ? 'admin' : 'user';
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = crypto.randomBytes(32).toString('hex');
//     User.createUser(username, email, hashedPassword, userRole, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         // Store verification token
//         User.storeVerificationToken(result.insertId, verificationToken, (err) => {
//             if (err) return res.status(500).json({ error: err.message });
//             const verificationUrl = `http://localhost:5000/api/auth/verify?token=${verificationToken}`;

//             transporter.sendMail({
//                 to: email,
//                 subject: 'Verify Your Email',
//                 html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
//             });
//             res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
//         });
//     });
// });


// // Verify Email
// router.get('/verify', (req, res) => {
//     const { token } = req.query;
//     if (!token) return res.status(400).json({ message: 'Invalid token' });
//     User.verifyUser(token, (err, result) => {
//         if (err || result.affectedRows === 0) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }
//         res.json({ message: 'Email verified successfully' });
//     });
// });


// router.get('/verify/:token', (req, res) => {
//     const { token } = req.params;

//     User.verifyUserByToken(token, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });

//         if (result.affectedRows === 0) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }

//         res.json({ message: 'Email successfully verified! You can now log in.' });
//     });
// });





// // Password Reset Request
// router.post('/reset-password-request', (req, res) => {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: 'Email is required' });
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const expiry = new Date(Date.now() + 3600000); // 1 hour expiration
//     User.storeResetToken(email, resetToken, expiry, (err, result) => {
//         if (err || result.affectedRows === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const resetUrl = `http://localhost:5000/api/auth/reset-password?token=${resetToken}`;
//         transporter.sendMail({
//             to: email,
//             subject: 'Reset Your Password',
//             html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
//         });
//         res.json({ message: 'Password reset email sent' });
//     });
// });


// // Reset Password
// router.post('/reset-password', async (req, res) => {
//     const { token, newPassword } = req.body;
//     if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required' });
//     User.resetPassword(token, newPassword, (err, result) => {
//         if (err || result.affectedRows === 0) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }
//         res.json({ message: 'Password reset successful' });
//     });
// });


// // Token Refresh
// router.post('/refresh', (req, res) => {
//     const { refreshToken } = req.body;
//     if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });
//     jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
//         if (err) return res.status(403).json({ message: 'Invalid refresh token' });
//         const accessToken = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
//         res.json({ accessToken });
//     });
// });


// // Login User
// router.post('/login', (req, res) => {

//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }
//     User.getUserByEmail(email, async (err, user) => {
//         if (err || !user) {
//             console.log("User not found or inactive.");
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ message: 'Login successful', token });
//     });
// });


// // Logout (Client should handle token removal)
// router.post('/logout', (req, res) => {
//     res.json({ message: 'Logout successful. Token should be removed on client side.' });
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 🚀 Register User with Email Verification
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userRole = role === 'admin' ? 'admin' : 'user';
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    User.createUser(username, email, hashedPassword, userRole, verificationToken, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const verificationUrl = `http://localhost:5000/api/auth/verify/${verificationToken}`;

        transporter.sendMail({
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
        });

        res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
    });
});





// 🚀 Verify Email
router.get('/verify/:token', (req, res) => {
    const { token } = req.params;

    User.verifyUserByToken(token, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.json({ message: 'Email successfully verified! You can now log in.' });
    });
});

// // 🚀 Login User (Only Verified Users)
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     User.getUserByEmail(email, async (err, user) => {
//         if (err || !user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // 🚫 Block login if user is not verified
//         if (user.is_verified === 0) {
//             return res.status(403).json({ message: 'Please verify your email before logging in.' });
//         }

//         // 🚫 Block login if user is soft deleted
//         if (user.is_active === 0) {
//             return res.status(403).json({ message: 'This account has been deactivated.' });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ message: 'Login successful', token });
//     });
// });


// 🚀 Login User (Only Verified Users)
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    User.getUserByEmail(email, async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        // console.log(user)
        console.log(email)
        if (!user) {
            return res.status(401).json({ message: 'no user found' });
        }

        // 🚫 Block login if user is not verified
        if (user.is_verified === 0) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        // 🚫 Block login if user is soft deleted
        if (user.is_active === 0) {
            return res.status(403).json({ message: 'This account has been deactivated.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(password,"password")
        console.log(user.password,"storedPassword")
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});





// 🚀 Password Reset Request
router.post('/reset-password-request', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour expiration

    User.storeResetToken(email, resetToken, expiry, (err, result) => {
        if (err || result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetUrl = `http://localhost:5000/api/auth/reset-password?token=${resetToken}`;
        transporter.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        res.json({ message: 'Password reset email sent' });
    });
});

// 🚀 Reset Password
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required' });

    User.resetPassword(token, newPassword, (err, result) => {
        if (err || result.affectedRows === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.json({ message: 'Password reset successful' });
    });
});

// 🚀 Token Refresh
router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });

        const accessToken = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ accessToken });
    });
});

// 🚀 Logout (Client should handle token removal)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful. Token should be removed on client side.' });
});

module.exports = router;

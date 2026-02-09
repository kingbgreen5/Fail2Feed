const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
require('dotenv').config();
const { sequelize } = require("../models"); // Import the Sequelize instance
const { Op } = require('sequelize');




const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // MUST be false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});



transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP VERIFY FAILED:', error);
  } else {
    console.log('SMTP SERVER READY');
  }
});







// Login endpoint
router.post('/login', async (req, res) => {
    try {
        console.log('Raw request body:', req.body);
        console.log('Headers:', req.headers);
        const { email, password } = req.body;
        
        // Log what we extracted
        console.log('Extracted credentials:', { email, password: password ? '[PRESENT]' : '[MISSING]' });
        
        // Validate input
        if (!email || !password) {
            console.log('Missing credentials:', { email: !!email, password: !!password });
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        console.log('User query result:', { found: !!user, email: email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password validation:', { valid: validPassword });
        
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id,
                username: user.username,
                email: user.email, 
                role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({ 
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        console.log('Raw request body:', req.body);
        console.log('Headers:', req.headers);
        const { username, email, password } = req.body;
        
        // Log what we extracted
        console.log('Extracted credentials:', { 
            username, 
            email, 
            password: password ? '[PRESENT]' : '[MISSING]' 
        });
        
        // Validate input
        if (!username || !email || !password) {
            console.log('Missing credentials:', { 
                username: !!username,
                email: !!email, 
                password: !!password 
            });
            return res.status(400).json({ 
                message: 'Username, email and password are required' 
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ 
            // where: { 
            //     [sequelize.Op.or]: [
            //         { email },
            //         { username }
            //     ]
            // } 

            where: { 
                [Op.or]: [
                    { email },
                    { username }
                ]
            }




        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: existingUser.email === email 
                    ? 'Email already exists' 
                    : 'Username already exists' 
            });
        }

        // Create verification token
        const verification_token = crypto.randomBytes(32).toString('hex');

        // Create user
        const user = await User.create({
            username,
            email,
            password, // Will be hashed by model hooks
            verification_token,
            is_active: true,
            is_verified: false
        });

        // Generate token
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username,
                email: user.email, 
                role: user.role 
            },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Send verification email
        const verificationUrl = `http://localhost:3000/verify-email/${verification_token}`;
        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email',
            html: `
                <h1>Welcome to Fail2Feed!</h1>
                <p>Thank you for registering. Please click the button below to verify your email address:</p>
                <a href="${verificationUrl}" style="
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                ">Verify Email</a>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p>${verificationUrl}</p>
            `
        });

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Email verification endpoint
router.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;
        
        // Find user with this verification token
        const user = await User.findOne({ 
            where: { 
                verification_token: token,
                is_verified: false
            } 
        });

        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid or expired verification token' 
            });
        }

        // Update user
        await user.update({
            is_verified: true,
            verification_token: null
        });

        // Redirect to frontend
        res.redirect('http://localhost:3000/login?verified=true');
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: 'Server error during verification' });
    }
});

// 🚀 Password Reset Request
router.post('/reset-password-request', (req, res) => {
    console.log('Raw request body:', req.body);
    console.log('Headers:', req.headers);
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour expiration

    User.storeResetToken(email, resetToken, expiry, (err, result) => {
        console.log('User reset token result:', { error: err, result: result });
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
    console.log('Raw request body:', req.body);
    console.log('Headers:', req.headers);
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required' });

    User.resetPassword(token, newPassword, (err, result) => {
        console.log('User reset password result:', { error: err, result: result });
        if (err || result.affectedRows === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.json({ message: 'Password reset successful' });
    });
});

//CHANGE TO RESET PASSWORD FRONTEND
router.get('/reset-password', (req, res) => {
    console.log('Raw request query:', req.query);
    console.log('Headers:', req.headers);
    const { token } = req.query;
    res.redirect(`http://yourfrontend.com/reset-password?token=${token}`);
});

// 🚀 Token Refresh
router.post('/refresh', (req, res) => {
    console.log('Raw request body:', req.body);
    console.log('Headers:', req.headers);
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
        console.log('Refresh token verification result:', { error: err, user: user });
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });

        const accessToken = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ accessToken });
    });
});

// 🚀 Logout (Client should handle token removal)
router.post('/logout', (req, res) => {
    console.log('Raw request body:', req.body);
    console.log('Headers:', req.headers);
    res.json({ message: 'Logout successful. Token should be removed on client side.' });
});

module.exports = router;

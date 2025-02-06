const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    User.getUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            // Generate JWT Token
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
                expiresIn: '1h'
            });

            res.json({ message: 'Login successful', token });
        });
    });
});

module.exports = router;

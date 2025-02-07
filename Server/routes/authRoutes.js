const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Login User
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     User.getUserByEmail(email, (err, user) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) return res.status(500).json({ error: err.message });
//             if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//             // 🔹 Include Role in JWT Token
//             const token = jwt.sign(
//                 { id: user.id, email: user.email, role: user.role },
//                 process.env.JWT_SECRET || 'your_jwt_secret_key',
//                 { expiresIn: '1h' }
//             );

//             res.json({ message: 'Login successful', token });
//         });
//     });
// });

// Login User
router.post('/login', (req, res) => {
    console.log("Login route hit"); // ← Check if this prints

    const { email, password } = req.body;
    console.log("Received Email:", email); // ← Check if Insomnia is sending the right email

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    User.getUserByEmail(email, async (err, user) => {
        if (err || !user) {
            console.log("User not found or inactive.");
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log("User found:", user);
        console.log("Entered Password:", password);
        console.log("Stored Hash:", user.password);

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Result:", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});






// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userRole = role === 'admin' ? 'admin' : 'user';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.createUser(username, email, hashedPassword, userRole, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});




module.exports = router;

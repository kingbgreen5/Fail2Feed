const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Import the User model

// Get all users
router.get('/all', (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a single user by ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result);
    });
});

// Create a new user
router.post('/create', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    User.createUser(username, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
});

// Update user info
router.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    User.updateUser(userId, username, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Delete a user
router.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;
    User.deleteUser(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;

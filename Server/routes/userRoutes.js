
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
require('dotenv').config();

// Get all users (Admin only)
router.get('/all', authenticateToken, authorizeAdmin, (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}); 

// Get a single user by ID (User can view own profile, Admin can view any profile)
router.get('/:id', authenticateToken, (req, res) => {
    const userId = req.params.id;

    if (req.user.role !== 'admin' && req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: 'Access denied' });
    }

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





// Update user info (User can update their own info, Admin can update any user)
router.put('/update/:id', authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    if (req.user.role !== 'admin' && req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: 'Access denied' });
    }

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    User.updateUser(userId, username, email, hashedPassword, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Soft delete user (User can deactivate own account, Admin can deactivate any user)
router.put('/deactivate/:id', authenticateToken, (req, res) => {
    const userId = req.params.id;

    if (req.user.role !== 'admin' && req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: 'Access denied' });
    }

    User.softDeleteUser(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User deactivated successfully' });
    });
});

module.exports = router;

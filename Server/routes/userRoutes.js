// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel'); // Import the User model


// // DOESNT SEEM LIKE THESE ARE AUTH PROTECTED!!!!


// // Get all users
// router.get('/all', (req, res) => {
//     User.getAllUsers((err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// // Get a single user by ID
// router.get('/:id', (req, res) => {
//     const userId = req.params.id;
//     User.getUserById(userId, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         if (!result) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(result);
//     });
// });

// // Create a new user
// router.post('/create', (req, res) => {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     User.createUser(username, email, password, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.status(201).json({ message: 'User created successfully', userId: result.insertId });
//     });
// });

// // Update user info
// router.put('/update/:id', (req, res) => {
//     const userId = req.params.id;
//     const { username, email, password } = req.body;

//     User.updateUser(userId, username, email, password, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ message: 'User updated successfully' });
//     });
// });

// // Delete a user
// router.delete('/delete/:id', (req, res) => {
//     const userId = req.params.id;
//     User.deleteUser(userId, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ message: 'User deleted successfully' });
//     });
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
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

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.createUser(username, email, hashedPassword, role || 'user', (err, result) => {
            // User.createUser(username, email, passwordassword, role || 'user', (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





// Login and generate token
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     User.getUserByEmail(email, async (err, user) => {
//         if (err || !user) {
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

// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     console.log("Login attempt for:", email);  // Debug

//     User.getUserByEmail(email, async (err, user) => {
//         if (err || !user) {
//             console.log("User not found or inactive");  // Debug
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         console.log("User found:", user);  // Debug

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             console.log("Password does not match");  // Debug
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         console.log("Login successful, token generated");  // Debug
//         res.json({ message: 'Login successful', token });
//     });
// });


// Login and generate token
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







// Logout (Client should handle token removal)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful. Token should be removed on client side.' });
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

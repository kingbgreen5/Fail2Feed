

const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    // Get all users (excluding deactivated users)
    getAllUsers: (callback) => {
        db.query('SELECT id, username, email, role FROM users WHERE is_active = 1', callback);
    },

    // Get a user by ID
    getUserById: (id, callback) => {
        db.query('SELECT id, username, email, role FROM users WHERE id = ? AND is_active = 1', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        });
    },






// Get a user by email (for login)
getUserByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ? AND is_active = 1', [email], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return callback(err, null);
        }

        if (results.length === 0) {
            console.log("No user found with this email or user is inactive.");
            return callback(null, null);
        }

        console.log("User found:", results[0]); // Logs the full user object (excluding sensitive info in production)
        console.log("Stored Hash:", results[0].password); // Logs the stored password hash

        callback(null, results[0]);
    });
},


    createUser: async (username, email, password, role = 'user', callback) => {
        console.log("Raw Password Before Hashing:", password);
        
        // const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role],
            callback
        );
    },
    



    // Update user information (optional password update)
    updateUser: async (id, username, email, password, callback) => {
        let query = 'UPDATE users SET username = ?, email = ?';
        let values = [username, email];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ', password = ?';
            values.push(hashedPassword);
        }

        query += ' WHERE id = ? AND is_active = 1';
        values.push(id);

        db.query(query, values, callback);
    },

    // Soft delete user (deactivate account)
    softDeleteUser: (id, callback) => {
        db.query('UPDATE users SET is_active = 0 WHERE id = ?', [id], callback);
    },

    // Check if a user is an admin
    isAdmin: (id, callback) => {
        db.query('SELECT role FROM users WHERE id = ? AND is_active = 1', [id], (err, results) => {
            if (err || !results.length) return callback(err, false);
            callback(null, results[0].role === 'admin');
        });
    }
};

module.exports = User;

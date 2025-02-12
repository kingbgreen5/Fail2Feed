

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

    // Get user by email (for login)
    getUserByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ? AND is_active = 1 ', [email], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length > 0 ? results[0] : null);
        });
    },

    // // Store verification token
    // storeVerificationToken: (userId, token, callback) => {
    //     db.query('UPDATE users SET verification_token = ? WHERE id = ?', [token, userId], callback);
    // },

    storeVerificationToken: (userId, token, callback) => {
        db.query('UPDATE users SET verification_token = ? WHERE id = ?', [token, userId], (err, result) => {
            if (err) {
                console.error('Error storing verification token:', err);
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    



    // // Verify user by token
    // verifyUserByToken: (token, callback) => {
    //     db.query(
    //         'UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?',
    //         [token],
    //         callback
    //     );
    // },

    verifyUserByToken: (token, callback) => {
        db.query(
            'UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?',
            [token],
            (err, result) => {
                if (err) {
                    console.error('Error verifying user:', err);
                    return callback(err, null);
                }
                callback(null, result);
            }
        );
    },
    

    // Store password reset token
    storeResetToken: (email, token, expiry, callback) => {
        db.query('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', [token, expiry, email], callback);
    },

    // Reset password
    resetPassword: async (token, newPassword, callback) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.query(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ? AND reset_token_expiry > NOW()',
            [hashedPassword, token],
            callback
        );
    },

    // // Create a new user (default `is_verified = 0`)
    // createUser: async (username, email, password, role = 'user', callback) => {
    //     db.query(
    //         'INSERT INTO users (username, email, password, role, is_verified) VALUES (?, ?, ?, ?, 0)',
    //         [username, email, password, role],
    //         callback
    //     );
    // },
    createUser: async (username, email, password, role = 'user', verificationToken, callback) => {
        try {
            const query = 'INSERT INTO users (username, email, password, role, is_verified, verification_token) VALUES (?, ?, ?, ?, 0, ?)';
            db.query(query, [username, email, password, role, verificationToken], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return callback(err, null);
                }
                callback(null, result);
            });
        } catch (error) {
            console.error('Unexpected error in createUser:', error);
            callback(error, null);
        }
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

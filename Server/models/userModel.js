const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    getUserByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length ? results[0] : null);
        });
    },

    createUser: (username, email, password, callback) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback(err, null);
            db.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hash],
                callback
            );
        });
    }
};

module.exports = User;

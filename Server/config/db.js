// db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();




const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Limegreengbc',
    database: process.env.DB_NAME || 'gun',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL!');
});



module.exports = db;
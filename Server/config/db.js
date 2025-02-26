// db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'gun',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'Welcome1',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL!');
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err.message);
    });

module.exports = sequelize;
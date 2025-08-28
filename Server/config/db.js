
// db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(
    process.env.DB_NAME || 'gun_migrated',
    process.env.DB_USER || 'postgres',  // PostgreSQL default user is usually 'postgres'
    process.env.DB_PASSWORD || 'Limegreengbc',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,  // PostgreSQL default port
        dialect: 'postgres',                // <-- Changed from 'mysql'
        logging: false,
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
        // console.log('Connected to the PostgreSQL "gun_migrated" database!');
         console.log(`Connected to the PostgreSQL "${sequelize.getDatabaseName()}" database!`);
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL:', err.message);
    });

module.exports = sequelize;



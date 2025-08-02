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
        console.log('Connected to MySQL!');
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err.message);
    });

module.exports = sequelize;



// // db.js
// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');
// dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME || 'gun',
//     process.env.DB_USER || 'postgres',  // PostgreSQL default user is usually 'postgres'
//     process.env.DB_PASSWORD || 'your_postgres_password',
//     {
//         host: process.env.DB_HOST || 'localhost',
//         port: process.env.DB_PORT || 5432,  // PostgreSQL default port
//         dialect: 'postgres',                // <-- Changed from 'mysql'
//         logging: false,
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// );

// // Test the connection
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connected to PostgreSQL!');
//     })
//     .catch(err => {
//         console.error('Error connecting to PostgreSQL:', err.message);
//     });

// module.exports = sequelize;



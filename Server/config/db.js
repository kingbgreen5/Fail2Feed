
// db.js
//LOCAL WORKING DB CONNECTION

// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');
// dotenv.config();


// const sequelize = new Sequelize(
//     process.env.DB_NAME || 'gun_migrated',
//     process.env.DB_USER || 'postgres',  // PostgreSQL default user is usually 'postgres'
//     process.env.DB_PASSWORD || 'Limegreengbc',
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
//         // console.log('Connected to the PostgreSQL "gun_migrated" database!');
//          console.log(`Connected to the PostgreSQL "${sequelize.getDatabaseName()}" database!`);
//     })
//     .catch(err => {
//         console.error('Error connecting to PostgreSQL:', err.message);
//     });

// module.exports = sequelize;


// db.js

console.log('DB_USER:', process.env.DB_USER);
console.log('DATABASE_URL:', process.env.DATABASE_URL);


const { Sequelize } = require("sequelize");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // required for Supabase & Render
    },
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connected to Supabase Postgres`);
  } catch (err) {
    console.error("❌ Unable to connect to Supabase:", err);
  }
})();

module.exports = sequelize;

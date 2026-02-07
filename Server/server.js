// const express = require('express');
// const cors = require('cors');
// const db = require('./models');
// const authRoutes = require('./routes/authRoutes');
// const firearmRoutes = require('./routes/firearmRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const userRoutes = require('./routes/userRoutes');
// const userFirearmsRoutes = require('./routes/userFirearmsRoutes');
// const aggregateRoutes = require('./routes/aggregateDataRoutes')

// const cron = require('node-cron');
// const updateAggregateData = require('./utils/updateAggregateData');



// require('dotenv').config();
// const app = express();

// // Configure CORS
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://fail2feed-plt7.onrender.com'],

//     credentials: true,
//     // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     // allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
// }));


// /* 🔴 Explicitly allow preflight requests 🔴 */
// app.options('*', cors());


// //console logging middleware to confirm requests are being received by the server
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });






// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Fail2Feed HomePage');
// });



// app.use('/api/users', userRoutes); 
// app.use('/api/auth', authRoutes);
// app.use('/api/firearms', firearmRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/userFirearms', userFirearmsRoutes);
// app.use('/api/aggregate', aggregateRoutes)



// const PORT = process.env.PORT || 5000;

// // Sync database and start server
// db.sequelize.sync()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}!!!!!`);
//             console.log('Database synced successfully');
//         });
//     })
//     .catch(err => {
//         console.error('Failed to sync database:', err);
//     });


//     //------------------------------------------------------------AGGREGATES DATA EVERY X MINS


//     // Run every minute (change to '0 */6 * * *' for every 6 hours)
// cron.schedule('*/1 * * * *', async () => {
//     await updateAggregateData();
// })


// ;




const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');

const authRoutes = require('./routes/authRoutes');
const firearmRoutes = require('./routes/firearmRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const userFirearmsRoutes = require('./routes/userFirearmsRoutes');
const aggregateRoutes = require('./routes/aggregateDataRoutes');

const cron = require('node-cron');
const updateAggregateData = require('./utils/updateAggregateData');

const app = express();

/* =========================================================
   🔴 CORS — MUST BE FIRST MIDDLEWARE 🔴
   ========================================================= */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://fail2feed-plt7.onrender.com'
  ],
  credentials: true
}));

/* 🔴 Explicitly handle ALL preflight OPTIONS requests 🔴 */
app.options('*', cors());

/* =========================================================
   Body parsing
   ========================================================= */
app.use(express.json());

/* =========================================================
   Debug logging (optional but helpful)
   ========================================================= */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/* =========================================================
   Health check
   ========================================================= */
app.get('/', (req, res) => {
  res.send('Fail2Feed API is running');
});

/* =========================================================
   Routes
   ========================================================= */
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/firearms', firearmRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/userFirearms', userFirearmsRoutes);
app.use('/api/aggregate', aggregateRoutes);

/* =========================================================
   Server start
   ========================================================= */
const PORT = process.env.PORT || 5000;

// db.sequelize.sync()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on port ${PORT}`);
//       console.log('✅ Database synced');
//     });
//   })
//   .catch(err => {
//     console.error('❌ Database sync failed:', err);
//   });



app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

db.sequelize.sync()
  .then(() => {
    console.log('✅ Database synced successfully');
  })
  .catch(err => {
    console.error('❌ Database sync failed:', err);
  });












/* =========================================================
   Cron aggregate data job
   ========================================================= */
// Runs every minute
cron.schedule('*/1 * * * *', async () => {
  try {
    await updateAggregateData();
  } catch (err) {
    console.error('❌ Aggregate update failed:', err);
  }
});

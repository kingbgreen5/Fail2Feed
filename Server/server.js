const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const firearmRoutes = require('./routes/firearmRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const userFirearmsRoutes = require('./routes/userFirearmsRoutes');
const aggregateRoutes = require('./routes/aggregateDataRoutes')

const cron = require('node-cron');
const updateAggregateData = require('./utils/updateAggregateData');


require('dotenv').config();
const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Fail2Feed HomePage');
});



app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/firearms', firearmRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/userFirearms', userFirearmsRoutes);
app.use('/api/aggregate', aggregateRoutes)



const PORT = process.env.PORT || 5000;

// Sync database and start server
db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}!!!!!`);
            console.log('Database synced successfully');
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });


    // Run every minute (change to '0 */6 * * *' for every 6 hours)
cron.schedule('*/1 * * * *', async () => {
    await updateAggregateData();
});
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const firearmRoutes = require('./routes/firearmRoutes');
const reportsRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const userFirearmsRoutes= require('./routes/userFirearmsRoutes');

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
app.use('/api/reports', reportsRoutes)
app.use('/api/userFirearms', userFirearmsRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!!!!!`));

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const firearmRoutes = require('./routes/firearmRoutes');
const reportsRoutes = require('./routes/reportsRoutes');


require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Fail2Feed HomePage');
});


app.use('/api/auth', authRoutes);
app.use('/api/firearms', firearmRoutes);
app.use('/api/reports', reportsRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!!!!!`));

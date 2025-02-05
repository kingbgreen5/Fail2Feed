const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const firearmRoutes = require('./routes/firearmRoutes');


// const mysql = require('mysql2');

//  //                                                                  --------------------CONNECTION------------------------
// const db = mysql.createConnection(       
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: 'Limegreengbc',
//     database: 'gun'
//   },
//   console.log(`Connected to the gun database`)
// );

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Fail2Feed HomePage');
});


app.use('/api/auth', authRoutes);
app.use('/api/firearms', firearmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!!!!!`));

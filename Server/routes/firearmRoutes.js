const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware"); // If you have authentication
const Firearm = require("../models/firearmModel");

const db = require('../config/db');

// Get all firearms
// router.get('/all', async (req, res) => {
//     console.log("Hit the get all firearms route")
//     try {
//         const firearms = await Firearm.getAllFirearms();
//         res.json(firearms);
//         console.log(firearms)
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });


router.get('/all', (req, res) => {
    db.query('SELECT * FROM firearms', (err, results) => {
        console.log("Hit the get all firearms route")
        if (err) {
            console.error('Error fetching firearms:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});





// Update a firearm
router.put('/update/:id', authenticateUser, async (req, res) => {
    try {
        const { make, model, manufacturing_date } = req.body;
        await Firearm.updateFirearm(req.params.id, make, model, manufacturing_date);
        res.json({ message: 'Firearm updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
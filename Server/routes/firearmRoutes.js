const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware"); 
const { QueryTypes } = require('sequelize');
const db = require('../config/db');
// const { Firearm } = require("../models/firearmModel");
const { Firearm } = require("../models"); // Ensure correct model import

router.get('/all', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM firearms', {
            type: QueryTypes.SELECT
        });
        res.json(results);
    } catch (err) {
        console.error('Error fetching firearms:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
});











// Get unique firearm makes
router.get('/makes', async (req, res) => {
    try {
        const results = await db.query('SELECT name FROM manufacturers ORDER BY name', {
            type: QueryTypes.SELECT
        });
        // console.log('Makes query results:', results);
        res.json(results.map(row => row.name));
    } catch (error) {
        console.error('Error fetching makes:', error);
        res.status(500).json({ error: 'Failed to fetch manufacturers' });
    }
});

// Get models for a selected make
router.get("/models", async (req, res) => {
    const make = req.query.make;
    if (!make) {
        return res.status(400).json({ error: "Manufacturer is required" });
    }

    try {
        const results = await db.query(
            "SELECT model FROM firearms WHERE make= ? ORDER BY model",
            {
                replacements: [make],
                type: QueryTypes.SELECT
            }
        );
        res.json(results.map(row => row.model));
    } catch (error) {
        console.error("Error fetching models:", error);
        res.status(500).json({ error: "Failed to fetch models" });
    }
});





// Route to find a firearm by make and model
router.get("/find", async (req, res) => {
    try {
        const { make, model } = req.query;

        if (!make || !model) {
            return res.status(400).json({ error: "Make and model are required" });
        }

        // const firearm = await findFirearmByMakeAndModel(make, model);

        const firearm = await Firearm.findOne({
            where: { make, model }
        });


        if (!firearm) {
            return res.status(404).json({ error: "Firearm not found" });
        }

        res.json(firearm);
    } catch (error) {
        console.error("Error finding firearm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});






// Update a firearm
router.put('/update/:id', authenticateUser.authenticateToken, async (req, res) => {
    try {
        const { make, model, manufacturing_date } = req.body;
        const result = await db.query(
            'UPDATE firearms SET make = ?, model = ?, manufacturing_date = ? WHERE id = ?',
            {
                replacements: [make, model, manufacturing_date, req.params.id],
                type: QueryTypes.UPDATE
            }
        );
        res.json({ message: 'Firearm updated' });
    } catch (error) {
        console.error('Error updating firearm:', error);
        res.status(500).json({ error: 'Failed to update firearm' });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware"); // If you have authentication
const Firearm = require("../models/firearmModel");

const db = require('../config/db');



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



// Get unique firearm makes
router.get('/makes', (req, res) => {
    Firearm.getAllMakes((err, results) => {
        console.log(results)
        if (err) return res.status(500).json({ error: err.message });
        // res.json(results.map(row => row.make));
        res.json(results);
    });
});





// router.get("/makes", async (req, res) => {
//     try {
//         const [rows] = await db.execute("SELECT name FROM manufacturers");
//         console.log("Database query result:", rows); // Log the result to debug
//         res.json(rows); // Send the response
//     } catch (error) {
//         console.error("Error fetching makes:", error);
//         res.status(500).json({ error: "Database error" });
//     }
// });


// Get models for a selected make
// router.get('/models', (req, res) => {
//     const { make } = req.query;
//     if (!make) return res.status(400).json({ error: "Make is required" });
//     Firearm.getModelsByMake(make, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         // res.json(results.map(row => row.model));
//     });
//     res.json(results.length > 0 ? results : []); // Always return an array

// });



// Get models for a selected make
router.get("/models", (req, res) => {
    const make = req.query.make;  // Get manufacturer name from query
    if (!make) {
        return res.status(400).json({ error: "Manufacturer is required" });
    }

    const query = "SELECT model FROM firearms WHERE manufacturer = ?";

    db.query(query, [make], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (!results || results.length === 0) {
            return res.json([]); // Return an empty array instead of causing an error
        }

        res.json(results.map(row => row.model)); // Send back an array of models
    });
});










// Update a firearm
router.put('/update/:id', authenticateUser.authenticateToken, async (req, res) => {
    try {
        const { make, model, manufacturing_date } = req.body;
        await Firearm.updateFirearm(req.params.id, make, model, manufacturing_date);
        res.json({ message: 'Firearm updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});












module.exports = router;
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware"); 
const { QueryTypes } = require('sequelize');
const db = require('../config/db');
const { aggregate_data } = require("../models"); // Ensure correct model import


const { getAggregateData } = require("../controllers/aggregateController");




// Route to get aggregate data with firearm details
router.get("/all", getAggregateData);







//-----------------------------------------------------------------------GET ALL from aggregate_data

router.get('/all', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM aggregate_data', {
            type: QueryTypes.SELECT
        });
        res.json(results);
    } catch (err) {
        console.error('Error fetching firearms:', err);
        res.status(500).json({ error: 'Database query failed' });
    }
});













module.exports = router;
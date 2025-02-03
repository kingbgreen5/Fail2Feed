const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware"); // If you have authentication
const Firearm = require("../models/Firearm");

// Get all firearms
router.get('/all', async (req, res) => {
    try {
        const firearms = await Firearm.getAllFirearms();
        res.json(firearms);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
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
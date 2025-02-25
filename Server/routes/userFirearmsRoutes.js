const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { addUserFirearm, getUserFirearms, removeUserFirearm } = require("../models/userFirearmsModel");

// Route to add a firearm to the user's profile
router.post("/add", authenticateToken, async (req, res) => {
    try {
        const { firearm_id } = req.body;
        if (!firearm_id) {
            return res.status(400).json({ message: "Firearm ID is required" });
        }
        const userId = req.user.id;
        const firearmEntryId = await addUserFirearm(userId, firearm_id);
        res.status(201).json({ message: "Firearm added successfully", firearmEntryId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to add firearm" });
    }
});

// Route to get all firearms associated with the logged-in user
router.get("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const firearms = await getUserFirearms(userId);
        res.json(firearms);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user firearms" });
    }
});

// Route to remove a firearm from the user's profile (soft delete)
router.delete("/remove/:firearm_id", authenticateToken, async (req, res) => {
    try {
        const { firearm_id } = req.params;
        const userId = req.user.id;
        const success = await removeUserFirearm(userId, firearm_id);
        if (success) {
            res.json({ message: "Firearm removed successfully" });
        } else {
            res.status(404).json({ message: "Firearm not found in user profile" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to remove firearm" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');
const { addUserFirearm, getUserFirearms, removeUserFirearm } = require('../controllers/userFirearmsController');
const {getFirearmId} = require('../controllers/firearmController');


// Route to get all firearm makes
// router.get("/makes", async (req, res) => {
//     try {
//         const makes = await db.Firearm.findAll({
//             attributes: [[db.sequelize.fn('DISTINCT', db.sequelize.col('make')), 'make']],
//             order: [['make', 'ASC']]
//         });
//         res.json(makes.map(row => row.make));
//     } catch (error) {
//         console.error("Error fetching makes:", error);
//         res.status(500).json({ message: "Failed to fetch firearm makes" });
//     }
// });

// Route to get models for a specific make
// router.get("/models", async (req, res) => {
//     try {
//         const { make } = req.query;
//         if (!make) {
//             return res.status(400).json({ message: "Make parameter is required" });
//         }

//         const models = await db.Firearm.findAll({
//             attributes: ['model'],
//             where: { make },
//             order: [['model', 'ASC']]
//         });
//         res.json(models.map(row => row.model));
//     } catch (error) {
//         console.error("Error fetching models:", error);
//         res.status(500).json({ message: "Failed to fetch firearm models" });
//     }
// });

// Route to add a firearm to the user's profile
router.post("/add", authenticateToken, async (req, res) => {
    try {
        console.log('Add firearm route hit', req.body);
        const { make, model } = req.body;
        if (!make || !model) {
            return res.status(400).json({ message: "Make and model are required" });
        }

            const firearmID = await  getFirearmId(make, model);
        console.log("firearm ID", firearmID)
        if (!firearmID) {
            return res.status(404).json({ message: "Firearm not found" });
        }

        const userId = req.user.id;
        const firearm_id = firearmID;
        const firearmEntryId = await addUserFirearm(userId, firearm_id);
        console.log(firearmEntryId)
        res.status(201).json({ message: "Firearm added successfully", firearmEntryId });
    } catch (error) {
        console.error("Error adding firearm:", error);
        res.status(500).json({ message: error.message || "Failed to add firearm" });
    }
   
});





// Route to get all firearms associated with the logged-in user
router.get("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(403).json({ message: "User authentication failed" });
        }
        const firearms = await getUserFirearms(userId);
        res.json(firearms);
    } catch (error) {
        console.error("Error fetching user firearms:", error);
        res.status(500).json({ message: "Failed to fetch user firearms" });
    }
});

// Route to remove a firearm from the user's profile (soft delete)
router.delete("/remove/:firearm_id", authenticateToken, async (req, res) => {
    try {
        const { firearm_id } = req.params;
        const userId = req.user.id;
        console.log("Delete Route hit, removing firearm ID", firearm_id , "from User ID", (userId));
        const success = await removeUserFirearm(userId, firearm_id);
        
        if (success) {
            res.json({ message: "Firearm removed successfully" });
        } else {
            res.status(404).json({ message: "Firearm not found or already removed" });
        }
    } catch (error) {
        console.error("Error removing firearm:", error);
        res.status(500).json({ message: "Failed to remove firearm" });
    }
});

module.exports = router;

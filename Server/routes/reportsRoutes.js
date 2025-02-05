const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');

// WORK ON THIS AGAIN AFTER USERID AND LOGIN IS FIGURED OUT





// Create a new report
router.post('/create', (req, res) => {
    const {
        user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
        firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
        magazine, ammunition, other, catastrophic, comments
    } = req.body;

    Report.createReport(
        user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
        firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
        magazine, ammunition, other, catastrophic, comments,
        (err, result) => {
            if (err) {
                console.error('Error creating report:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Report created successfully', reportId: result.insertId });
        }
    );
});

// Update a report
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const {
        user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
        firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
        magazine, ammunition, other, catastrophic, comments
    } = req.body;

    Report.updateReport(
        id, user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
        firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
        magazine, ammunition, other, catastrophic, comments,
        (err, result) => {
            if (err) {
                console.error('Error updating report:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Report not found' });
            }
            res.json({ message: 'Report updated successfully' });
        }
    );
});

module.exports = router;

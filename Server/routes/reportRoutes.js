const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');
const authenticateToken = require('../middleware/authMiddleware');

// Get all reports (Public)
router.get('/all', (req, res) => {
    Report.getAllReports((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a report (Protected)
router.post('/create', authenticateToken, (req, res) => {
    const userId = req.user.id; // Get user ID from token
    const { firearmId, ammoId, suppressor, optic, modified, date, manufactureYear, roundsFired, firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking, magazine, ammunition, other, catastrophic, comments } = req.body;

    if (!firearmId || !date || roundsFired === undefined) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    Report.createReport(userId, firearmId, ammoId, suppressor, optic, modified, date, manufactureYear, roundsFired, firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking, magazine, ammunition, other, catastrophic, comments, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Report created', reportId: result.insertId });
    });
});

// Delete a report (Protected)
router.delete('/delete/:id', authenticateToken, (req, res) => {
    const reportId = req.params.id;

    Report.deleteReport(reportId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Report deleted' });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');


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


// ------------------ SOFT DELETE -----------------

//  Admin Soft Delete

// THIS IS AN EXAMPLE OF HOW TO USE AUTHORIZEADMIN TO RESTRICT CERTAIN ACTIONS TO ADMIN ONLY
// COULD BE APPLIED TO SOMETHING LIKE DELETE FIREARM OR DELETE REPORTS THAT SEEM FRAUDULENT
router.put('/admin/delete/:id', authenticateToken, authorizeAdmin, (req, res) => {
    const reportId = req.params.id;

    Report.softDeleteReport(reportId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Report deactivated successfully by admin.' });
    });
});

// User Soft Delete (Only Their Own Reports)
router.put('/user/delete/:id', authenticateToken, (req, res) => {
    const reportId = req.params.id;
    const userId = req.user.id;

    Report.softDeleteReportByUser(reportId, userId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(403).json({ message: 'Unauthorized to delete this report.' });
        }
        res.json({ message: 'Report deactivated successfully by user.' });
    });
});


// THIS IS AN EXAMPLE OF HOW TO USE AUTHORIZEADMIN TO RESTRICT CERTAIN ACTIONS TO ADMIN ONLY
// COULD BE APPLIED TO SOMETHING LIKE DELETE FIREARM OR DELETE REPORTS THAT SEEM FRAUDULENT







module.exports = router;

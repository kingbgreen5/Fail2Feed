// const express = require('express');
// const router = express.Router();
// const Report = require('../models/reportModel');
// const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');


// // Get all reports (Public)
// router.get('/all', (req, res) => {
//     Report.getAllReports((err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// });







// // Create a report (Protected)
// router.post('/create', authenticateToken, (req, res) => {
//     const userId = req.user.id; // Get user ID from token
//     const { firearmId, ammoId, suppressor, optic, modified, date, manufactureYear, roundsFired, firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking, magazine, ammunition, other, catastrophic, comments } = req.body;

//     if (!firearmId || !date || roundsFired === undefined) {
//         return res.status(400).json({ message: 'Required fields are missing' });
//     }

//     Report.createReport(userId, firearmId, ammoId, suppressor, optic, modified, date, manufactureYear, roundsFired, firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking, magazine, ammunition, other, catastrophic, comments, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({ message: 'Report created', reportId: result.insertId });
//     });
// });


// // ------------------ SOFT DELETE -----------------

// //  Admin Soft Delete

// // THIS IS AN EXAMPLE OF HOW TO USE AUTHORIZEADMIN TO RESTRICT CERTAIN ACTIONS TO ADMIN ONLY
// // COULD BE APPLIED TO SOMETHING LIKE DELETE FIREARM OR DELETE REPORTS THAT SEEM FRAUDULENT
// router.put('/admin/delete/:id', authenticateToken, authorizeAdmin, (req, res) => {
//     const reportId = req.params.id;

//     Report.softDeleteReport(reportId, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: 'Report deactivated successfully by admin.' });
//     });
// });

// // User Soft Delete (Only Their Own Reports)
// router.put('/user/delete/:id', authenticateToken, (req, res) => {
//     const reportId = req.params.id;
//     const userId = req.user.id;

//     Report.softDeleteReportByUser(reportId, userId, (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (result.affectedRows === 0) {
//             return res.status(403).json({ message: 'Unauthorized to delete this report.' });
//         }
//         res.json({ message: 'Report deactivated successfully by user.' });
//     });
// });


// // THIS IS AN EXAMPLE OF HOW TO USE AUTHORIZEADMIN TO RESTRICT CERTAIN ACTIONS TO ADMIN ONLY
// // COULD BE APPLIED TO SOMETHING LIKE DELETE FIREARM OR DELETE REPORTS THAT SEEM FRAUDULENT







// module.exports = router;
const express = require('express');
const router = express.Router();
const { Report } = require('../models'); // Import Sequelize models

// Create a new report
router.post('/', async (req, res) => {
    try {
        const report = await Report.create(req.body);
        res.status(201).json({ message: 'Report inserted successfully', report });
    } catch (error) {
        console.error('Error inserting report:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get a single report by ID
router.get('/:id', async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete a report by ID (soft delete)
router.delete('/:id', async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        await report.update({ is_active: false });
        res.json({ message: 'Report soft-deleted' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;

const express = require('express');
const Report = require('../models/Report');
const Malfunction = require('../models/Malfunction');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new range report
router.post('/create', authenticateUser, async (req, res) => {
    try {
        const { firearm_id, report_date, temperature, rounds_fired, malfunctions } = req.body;
        const user_id = req.user.id;

        const [result] = await Report.createReport(user_id, firearm_id, report_date, temperature, rounds_fired);
        const report_id = result.insertId;

        for (const malfunction of malfunctions) {
            await Malfunction.createMalfunction(report_id, malfunction.type, malfunction.count);
        }

        res.status(201).json({ message: 'Range report created' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all reports by user
router.get('/user', authenticateUser, async (req, res) => {
    try {
        const reports = await Report.getReportsByUser(req.user.id);
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a range report
router.put('/update/:id', authenticateUser, async (req, res) => {
    try {
        const { temperature, rounds_fired, malfunctions } = req.body;
        const report_id = req.params.id;

        await Report.updateReport(report_id, temperature, rounds_fired);
        await Malfunction.deleteMalfunctionsByReport(report_id);

        for (const malfunction of malfunctions) {
            await Malfunction.createMalfunction(report_id, malfunction.type, malfunction.count);
        }

        res.json({ message: 'Range report updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a range report
router.delete('/delete/:id', authenticateUser, async (req, res) => {
    try {
        await Report.deleteReport(req.params.id);
        res.json({ message: 'Range report deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

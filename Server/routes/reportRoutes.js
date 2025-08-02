
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


// Get all reports for a specific firearm_id
router.get('/firearm/:firearm_id', async (req, res) => {
    try {
        const { firearm_id } = req.params;
        const reports = await Report.findAll({
            where: { firearm_id, is_active: true } // Fetch only active reports
        });

        if (!reports.length) {
            return res.status(404).json({ error: 'No reports found for this firearm' });
        }

        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports by firearm_id:', error);
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

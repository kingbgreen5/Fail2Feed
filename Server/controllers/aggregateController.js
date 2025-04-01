const db = require('../models');
const Firearm = db.Firearm;
const AggregateData = db.AggregateData;
//--------------------------------------------------------------FETCHES AGGREGATE DATA, DOES MATH
async function getAggregateData(req, res) {
    try {
        const results = await AggregateData.findAll({
            attributes: [
                "id",
                "firearm_id",
                "rounds_fired",
                "total_malfunctions",
                "firing_total",
                "unlocking_total",
                "ejecting_total",
                "cocking_total",
                "feeding_total",
                "chambering_total",
                "locking_total",
                "magazine_total",
                "ammunition_total",
                "other_total",
                "catastrophic_total",
                [db.Sequelize.literal("(failure_rate * 100)"), "failure_rate_percentage"] // Convert to percentage
            ],
            include: [
                {
                    model: Firearm,
                    attributes: ["make", "model"], // Fetching firearm details
                },
            ],
        });
        
        res.json(results);
    } catch (error) {
        console.error("Error fetching aggregate data:", error);
        res.status(500).json({ error: "Database query failed" });
    }
}

module.exports = { getAggregateData };



const db = require('../models');
const Firearm = db.Firearm;
const AggregateData = db.AggregateData;

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

                // Failure Rate Percentage
                [db.Sequelize.literal("(failure_rate * 100)"), "failure_rate_percentage"],

                // Individual Malfunction Percentages
                [db.Sequelize.literal("(firing_total / NULLIF(total_malfunctions, 0)) * 100"), "firing_percent"],
                [db.Sequelize.literal("(unlocking_total / NULLIF(total_malfunctions, 0)) * 100"), "unlocking_percent"],
                [db.Sequelize.literal("(extracting_total / NULLIF(total_malfunctions, 0)) * 100"), "extracting_percent"],
                [db.Sequelize.literal("(ejecting_total / NULLIF(total_malfunctions, 0)) * 100"), "ejecting_percent"],
                [db.Sequelize.literal("(cocking_total / NULLIF(total_malfunctions, 0)) * 100"), "cocking_percent"],
                [db.Sequelize.literal("(feeding_total / NULLIF(total_malfunctions, 0)) * 100"), "feeding_percent"],
                [db.Sequelize.literal("(chambering_total / NULLIF(total_malfunctions, 0)) * 100"), "chambering_percent"],
                [db.Sequelize.literal("(locking_total / NULLIF(total_malfunctions, 0)) * 100"), "locking_percent"],
                [db.Sequelize.literal("(magazine_total / NULLIF(total_malfunctions, 0)) * 100"), "magazine_percent"],
                [db.Sequelize.literal("(ammunition_total / NULLIF(total_malfunctions, 0)) * 100"), "ammunition_percent"],
                [db.Sequelize.literal("(other_total / NULLIF(total_malfunctions, 0)) * 100"), "other_percent"]
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










async function getAggregateDataById(req, res) {
    try {
        const { id } = req.params;

        const result = await AggregateData.findOne({
            where: { firearm_id: id },
            attributes: [
                "id",
                "firearm_id",
                "rounds_fired",
                "total_malfunctions",
                "firing_total",
                "unlocking_total",
                "ejecting_total",
                "extracting_total",
                "cocking_total",
                "feeding_total",
                "chambering_total",
                "locking_total",
                "magazine_total",
                "ammunition_total",
                "other_total",
                "catastrophic_total",

                // Failure Rate Percentage
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND(failure_rate::numeric * 100, 1),
                            0.0
                        )
                    `),
                    "failure_rate_percentage"
                ],

                // Individual Malfunction Percentages
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((firing_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "firing_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((unlocking_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "unlocking_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((extracting_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "extracting_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((ejecting_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "ejecting_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((cocking_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "cocking_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((feeding_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "feeding_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((chambering_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "chambering_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((locking_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "locking_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((magazine_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "magazine_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((ammunition_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "ammunition_percent"
                ],
                [
                    db.Sequelize.literal(`
                        COALESCE(
                            ROUND((other_total * 100.0) / NULLIF(total_malfunctions, 0), 1),
                            0.0
                        )
                    `),
                    "other_percent"
                ]
            ],
            include: [
                {
                    model: Firearm,
                    attributes: ["make", "model"],
                }
            ],
        });

        if (!result) {
            return res.status(404).json({ error: "Firearm not found" });
        }

        res.json(result);
    } catch (error) {
        console.error("Error fetching firearm data:", error);
        res.status(500).json({ error: "Database query failed" });
    }
}






module.exports = { getAggregateData, getAggregateDataById };
// module.exports = { getAggregateData };




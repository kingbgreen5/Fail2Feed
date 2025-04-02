// const db = require('../models');
// const Firearm = db.Firearm;
// const AggregateData = db.AggregateData;
// //--------------------------------------------------------------FETCHES AGGREGATE DATA, DOES MATH
// async function getAggregateData(req, res) {
//     try {
//         const results = await AggregateData.findAll({
//             attributes: [
//                 "id",
//                 "firearm_id",
//                 "rounds_fired",
//                 "total_malfunctions",
//                 "firing_total",
//                 "unlocking_total",
//                 "ejecting_total",
//                 "cocking_total",
//                 "feeding_total",
//                 "chambering_total",
//                 "locking_total",
//                 "magazine_total",
//                 "ammunition_total",
//                 "other_total",
//                 "catastrophic_total",



//                 [db.Sequelize.literal("(failure_rate * 100)"), "failure_rate_percentage"] // Convert to percentage
//                 [db.Sequelize.literal("(firing_total / NULLIF(rounds_fired, 0)) * 100"), "firing_percent"] // Convert firing total to percentage

//                 [db.Sequelize.literal("(unlocking_total / NULLIF(rounds_fired, 0)) * 100"), "unlocking_percent"] // Convert firing total to percentage

//                 [db.Sequelize.literal("(firing_total / NULLIF(rounds_fired, 0)) * 100"), "firing_percent"] // Convert firing total to percentage
//                 [db.Sequelize.literal("(firing_total / NULLIF(rounds_fired, 0)) * 100"), "firing_percent"] // Convert firing total to percentage
//             ],
//             include: [
//                 {
//                     model: Firearm,
//                     attributes: ["make", "model"], // Fetching firearm details
//                 },
//             ],
//         });
        
//         res.json(results);
//     } catch (error) {
//         console.error("Error fetching aggregate data:", error);
//         res.status(500).json({ error: "Database query failed" });
//     }
// }

// module.exports = { getAggregateData };


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
                "cocking_total",
                "feeding_total",
                "chambering_total",
                "locking_total",
                "magazine_total",
                "ammunition_total",
                "other_total",
                "catastrophic_total",

                // Failure Rate Percentage (Rounded to 1 decimal)
                [db.Sequelize.literal("ROUND(failure_rate * 100, 1)"), "failure_rate_percentage"],

                // Individual Malfunction Percentages (Rounded to 1 decimal)
                [db.Sequelize.literal("ROUND((firing_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "firing_percent"],
                [db.Sequelize.literal("ROUND((unlocking_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "unlocking_percent"],
                [db.Sequelize.literal("ROUND((extracting_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "extracting_percent"],
                [db.Sequelize.literal("ROUND((ejecting_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "ejecting_percent"],
                [db.Sequelize.literal("ROUND((cocking_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "cocking_percent"],
                [db.Sequelize.literal("ROUND((feeding_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "feeding_percent"],
                [db.Sequelize.literal("ROUND((chambering_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "chambering_percent"],
                [db.Sequelize.literal("ROUND((locking_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "locking_percent"],
                [db.Sequelize.literal("ROUND((magazine_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "magazine_percent"],
                [db.Sequelize.literal("ROUND((ammunition_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "ammunition_percent"],
                [db.Sequelize.literal("ROUND((other_total / NULLIF(total_malfunctions, 0)) * 100, 1)"), "other_percent"]
            ],
            include: [
                {
                    model: Firearm,
                    attributes: ["make", "model"], // Fetching firearm details
                },
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




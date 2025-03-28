
// // const { QueryTypes } = require("sequelize");
// const db = require('../models');
// const Firearm = db.Firearm;
// const AggregateData =db.AggregateData




// //--------------------------------------------------------------FETCHES AGGREGATE DATA

// async function getAggregateData(req, res) {
//     try {
//         const results = await AggregateData.findAll({
//             attributes: ["id", "firearm_id", "rounds_fired", "total_malfunctions", "failure_rate"],
//             include: [
//                 {
//                     model: Firearm,
//                     attributes: ["make", "model"], // Fetching firearm details
//                 },
//             ],
//             raw: true, // This flattens the result structure
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

//--------------------------------------------------------------FETCHES AGGREGATE DATA
async function getAggregateData(req, res) {
    try {
        const results = await AggregateData.findAll({
            attributes: [
                "id",
                "firearm_id",
                "rounds_fired",
                "total_malfunctions",
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

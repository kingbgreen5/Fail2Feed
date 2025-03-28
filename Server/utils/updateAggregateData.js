// const { AggregateData, Report } = require('../models');

// async function updateAggregateData() {
//     try {
//         const aggregatedResults = await Report.findAll({
//             attributes: [
//                 'firearm_id',
//                 [Report.sequelize.fn('SUM', Report.sequelize.col('rounds_fired')), 'total_rounds'],
//                 [
//                     Report.sequelize.fn(
//                         'SUM',
//                         Report.sequelize.literal(
//                             'firing + unlocking + extracting + ejecting + cocking + feeding + chambering + locking + magazine + ammunition + other'
//                         )
//                     ),
//                     'total_malfunctions'
//                 ],
//             ],
//             group: ['firearm_id'],
//             raw: true,
//         });

//         for (const result of aggregatedResults) {
//             await AggregateData.upsert({
//                 firearm_id: result.firearm_id,
//                 rounds_fired: result.total_rounds,
//                 total_malfunctions: result.total_malfunctions,
//             });
//         }

//         console.log('✅ Aggregate data updated successfully');
//     } catch (error) {
//         console.error('❌ Error updating aggregate data:', error);
//     }
// }

// module.exports = updateAggregateData;




const { AggregateData, Report } = require("../models");

async function updateAggregateData() {
    try {
        const aggregatedResults = await Report.findAll({
            attributes: [
                "firearm_id",
                [Report.sequelize.fn("SUM", Report.sequelize.col("rounds_fired")), "total_rounds"],
                [
                    Report.sequelize.fn(
                        "SUM",
                        Report.sequelize.literal(
                            "firing + unlocking + extracting + ejecting + cocking + feeding + chambering + locking + magazine + ammunition + other"
                        )
                    ),
                    "total_malfunctions"
                ],
            ],
            group: ["firearm_id"],
            raw: true,
        });

        for (const result of aggregatedResults) {
            const failureRate = result.total_rounds > 0 
                ? (result.total_malfunctions / result.total_rounds).toFixed(4) // Rounded to 4 decimal places
                : 0;

            await AggregateData.upsert({
                firearm_id: result.firearm_id,
                rounds_fired: result.total_rounds,
                total_malfunctions: result.total_malfunctions,
                failure_rate: failureRate, // Save calculated failure rate
            });
        }

        console.log("✅ Aggregate data updated successfully");
    } catch (error) {
        console.error("❌ Error updating aggregate data:", error);
    }
}

module.exports = updateAggregateData;

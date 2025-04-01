const { AggregateData, Report } = require("../models");

async function updateAggregateData() {
    try {

        const aggregatedResults = await Report.findAll({
            attributes: [
                "firearm_id",
                [Report.sequelize.fn("SUM", Report.sequelize.col("rounds_fired")), "total_rounds"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("firing")), "firing_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("unlocking")), "unlocking_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("extracting")), "extracting_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("ejecting")), "ejecting_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("cocking")), "cocking_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("feeding")), "feeding_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("chambering")), "chambering_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("locking")), "locking_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("magazine")), "magazine_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("ammunition")), "ammunition_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("other")), "other_total"],
                [Report.sequelize.fn("SUM", Report.sequelize.col("catastrophic")), "catastrophic_total"],
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
                ? (result.total_malfunctions / result.total_rounds).toFixed(4)
                : 0;

            try {
                const [updatedRecord, created] = await AggregateData.upsert({
                    firearm_id: result.firearm_id,
                    rounds_fired: result.total_rounds,
                    total_malfunctions: result.total_malfunctions,
                    failure_rate: failureRate,
                    firing_total: result.firing_total,
                    unlocking_total: result.unlocking_total,
                    extracting_total: result.extracting_total,
                    ejecting_total: result.ejecting_total,
                    cocking_total: result.cocking_total,
                    feeding_total: result.feeding_total,
                    chambering_total: result.chambering_total,
                    locking_total: result.locking_total,
                    magazine_total: result.magazine_total,
                    ammunition_total: result.ammunition_total,
                    other_total: result.other_total,
                    catastrophic_total: result.catastrophic_total,
                });

                // console.log(`✅ Successfully ${created ? "created" : "updated"} record for firearm_id: ${result.firearm_id}`);
            } catch (error) {
                console.error(`❌ Error on UPSERT for firearm_id: ${result.firearm_id}`, error);
            }
        }

        console.log("🎯 Aggregate data update completed successfully.");
    } catch (error) {
        console.error("❌ Error updating aggregate data:", error);
    }
}

module.exports = updateAggregateData;

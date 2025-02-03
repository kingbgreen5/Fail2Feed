const db = require('../config/db');

class Firearm {
    static async createFirearm(make, model, manufacturing_date) {
        const sql = 'INSERT INTO firearms (make, model, manufacturing_date) VALUES (?, ?, ?)';
        return db.execute(sql, [make, model, manufacturing_date]);
    }

    static async getFirearmStats(model) {
        const sql = `
            SELECT 
                f.model,
                SUM(rr.rounds_fired) AS total_rounds,
                SUM(m.count) AS total_malfunctions,
                SUM(CASE WHEN m.type = 'Failure to Feed' THEN m.count ELSE 0 END) AS failure_to_feed,
                SUM(CASE WHEN m.type = 'Failure to Eject' THEN m.count ELSE 0 END) AS failure_to_eject
            FROM firearms f
            JOIN range_reports rr ON f.id = rr.firearm_id
            LEFT JOIN malfunctions m ON rr.id = m.report_id
            WHERE f.model = ?
            GROUP BY f.model
        `;
        const [rows] = await db.execute(sql, [model]);
        return rows[0];
    }
}

module.exports = Firearm;

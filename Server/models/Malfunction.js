const db = require('../config/db');

class Malfunction {
    static async createMalfunction(report_id, type, count) {
        const sql = `INSERT INTO malfunctions (report_id, type, count) VALUES (?, ?, ?)`;
        return db.execute(sql, [report_id, type, count]);
    }

    static async deleteMalfunctionsByReport(report_id) {
        const sql = `DELETE FROM malfunctions WHERE report_id = ?`;
        return db.execute(sql, [report_id]);
    }
}

module.exports = Malfunction;

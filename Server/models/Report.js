const db = require('../config/db');

class Report {
    static async createReport(user_id, firearm_id, report_date, temperature, rounds_fired) {
        const sql = `INSERT INTO range_reports (user_id, firearm_id, report_date, temperature, rounds_fired)
                     VALUES (?, ?, ?, ?, ?)`;
        return db.execute(sql, [user_id, firearm_id, report_date, temperature, rounds_fired]);
    }

    static async getReportsByUser(user_id) {
        const sql = `SELECT * FROM range_reports WHERE user_id = ?`;
        const [rows] = await db.execute(sql, [user_id]);
        return rows;
    }

    static async updateReport(report_id, temperature, rounds_fired) {
        const sql = `UPDATE range_reports SET temperature = ?, rounds_fired = ? WHERE id = ?`;
        return db.execute(sql, [temperature, rounds_fired, report_id]);
    }

    static async deleteReport(report_id) {
        const sql = `DELETE FROM range_reports WHERE id = ?`;
        return db.execute(sql, [report_id]);
    }
}

module.exports = Report;

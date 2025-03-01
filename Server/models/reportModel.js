const db = require('../config/db');



// WORK ON THIS AGAIN AFTER USERID AND LOGIN IS FIGURED OUT



const Report = {
    getAllReports : (callback) => {
        db.query('SELECT * FROM reports WHERE is_active = TRUE', callback);
    },

    getReportById: (id, callback) => {
        db.query('SELECT * FROM reports WHERE id = ?', [id], callback);
    },

    createReport: (
        user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
        firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
        magazine, ammunition, other, catastrophic, comments, callback
    ) => {
        db.query(
            `INSERT INTO reports 
            (user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
            firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
            magazine, ammunition, other, catastrophic, comments) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
                firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
                magazine, ammunition, other, catastrophic, comments
            ],
            callback
        );
    },

    updateReport: (
        id, user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
        firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
        magazine, ammunition, other, catastrophic, comments, callback
    ) => {
        db.query(
            `UPDATE reports SET user_id = ?, firearm_id = ?, ammo_id = ?, suppressor = ?, optic = ?, modified = ?, 
            date = ?, manufacture_year = ?, rounds_fired = ?, firing = ?, unlocking = ?, extracting = ?, 
            ejecting = ?, cocking = ?, feeding = ?, chambering = ?, locking = ?, magazine = ?, ammunition = ?, 
            other = ?, catastrophic = ?, comments = ? WHERE id = ?`,
            [
                user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
                firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
                magazine, ammunition, other, catastrophic, comments, id
            ],
            callback
        );
    },


    
   softDeleteReport: (reportId, callback) => {
        db.query(
            'UPDATE reports SET is_active = FALSE WHERE id = ?',
            [reportId],
            callback
        );
    },
    
    softDeleteReportByUser: (reportId, userId, callback) => {
        db.query(
            'UPDATE reports SET is_active = FALSE WHERE id = ? AND user_id = ?',
            [reportId, userId],
            callback
        );
    }


};

module.exports = Report;

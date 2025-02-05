const db = require('../config/db');

const Firearm = {
    getAllFirearms: (callback) => {
        db.query('SELECT * FROM firearm', callback);
    },

    createFirearm: (make, model, roundsFired, reportsFiled, callback) => {
        db.query(
            'INSERT INTO firearm (make, model, rounds_fired, reports_filed) VALUES (?, ?, ?, ?)',
            [make, model, roundsFired, reportsFiled],
            callback
        );
    }
};

module.exports = Firearm;

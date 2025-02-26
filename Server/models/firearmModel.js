const db = require('../config/db');

const Firearm = {
    getAllFirearms: (callback) => {
        db.query('SELECT * FROM firearms', callback);
    },

    createFirearm: (manufacturer, model, roundsFired, reportsFiled, callback) => {
        db.query(
            'INSERT INTO firearms (manufacturer, model, rounds_fired, reports_filed) VALUES (?, ?, ?, ?)',
            [manufacturer, model, roundsFired, reportsFiled],
            callback
        );
    },

    getAllMakes: (callback) => {
        db.query('SELECT name FROM manufacturers ORDER BY name', (error, results) => {
            if (error) return callback(error, null);
            const makes = results.map(row => row.name);
            callback(null, makes);
        });
    },

    getModelsByMake: (make, callback) => {
        db.query(
            'SELECT model FROM firearms WHERE manufacturer = ? AND is_active = 1 ORDER BY model',
            [make],
            (error, results) => {
                if (error) return callback(error, null);
                const models = results.map(row => row.model);
                callback(null, models);
            }
        );
    },

    addRoundsFired: (firearmId, rounds, callback) => {
        db.query(
            'UPDATE firearms SET rounds_fired = rounds_fired + ? WHERE id = ?',
            [rounds, firearmId],
            callback
        );
    },

    incrementReportsFiled: (firearmId, callback) => {
        db.query(
            'UPDATE firearms SET reports_filed = reports_filed + 1 WHERE id = ?',
            [firearmId],
            callback
        );
    }
};

module.exports = Firearm;

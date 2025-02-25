const db = require('../config/db');

const Firearm = {
    getAllFirearms: (callback) => {
        db.query('SELECT * FROM firearms', callback);
    },

    createFirearm: (make, model, roundsFired, reportsFiled, callback) => {
        db.query(
            'INSERT INTO firearms (make, model, rounds_fired, reports_filed) VALUES (?, ?, ?, ?)',
            [make, model, roundsFired, reportsFiled],
            callback
        );
    },



    getAllMakes: (callback) => {
        db.query('SELECT DISTINCT name FROM manufacturers', (error, results) => {
            if (error) return callback(error, null);
            
            // Convert the array of objects into an array of strings
            const makes = results.map(row => row.name);
            callback(null, makes);
        });
    },




    
    // getModelsByMake: (make, callback) => {
    //     db.query('SELECT model FROM firearms WHERE make = ?', [make], callback);
    // },




    getModelsByMake: (make, callback) => {
        // Ensure we're using manufacturer_id instead of make (string)
        const query = `
            SELECT model 
            FROM firearms 
            WHERE manufacturer = ?
            )
        `;

        db.query(query, [make], (error, results) => {
            if (error) return callback(error, null);

            // Convert the result into an array of model names
            const models = results.map(row => row.model);
            callback(null, models);
        });
    }











};

module.exports = Firearm;

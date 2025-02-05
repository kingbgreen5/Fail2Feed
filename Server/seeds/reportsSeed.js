const db = require('../config/db');

// WORK ON THIS AGAIN AFTER USERID AND LOGIN IS FIGURED OUT



const seedReports = () => {
    // Delete all existing data in the reports table before seeding
    const deleteTableQuery = 'DELETE FROM reports;';

    db.query(deleteTableQuery, (err) => {
        if (err) {
            console.error('❌ Error deleting existing reports:', err);
            return;
        }
        console.log('🧹 Reports table cleared.');

        // Recreate table structure (optional safety check)
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS reports (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                firearm_id INT NOT NULL,
                ammo_id INT NOT NULL,
                suppressor BOOLEAN,
                optic BOOLEAN,
                modified BOOLEAN,
                date DATE NOT NULL,
                manufacture_year INT,
                rounds_fired INT NOT NULL,
                firing INT DEFAULT 0,
                unlocking INT DEFAULT 0,
                extracting INT DEFAULT 0,
                ejecting INT DEFAULT 0,
                cocking INT DEFAULT 0,
                feeding INT DEFAULT 0,
                chambering INT DEFAULT 0,
                locking INT DEFAULT 0,
                magazine INT DEFAULT 0,
                ammunition INT DEFAULT 0,
                other INT DEFAULT 0,
                catastrophic INT DEFAULT 0,
                comments TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (firearm_id) REFERENCES firearm(id) ON DELETE CASCADE
            );
        `;

        db.query(createTableQuery, (err) => {
            if (err) {
                console.error('❌ Error creating reports table:', err);
                return;
            }
            console.log('✅ Reports table verified/created.');

            // Insert test data
            const insertReportsQuery = `
                INSERT INTO reports 
                (user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
                firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
                magazine, ammunition, other, catastrophic, comments) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const testReports = [
                [1, 1, 1, true, false, true, '2025-02-04', 2020, 50, 0, 1, 0, 2, 0, 1, 0, 1, 1, 0, 0, 0, 'Test report 1'],
                [2, 2, 2, false, true, false, '2025-02-03', 2018, 120, 1, 0, 2, 0, 1, 0, 1, 0, 0, 2, 1, 0, 'Test report 2']
            ];

            testReports.forEach((report) => {
                db.query(insertReportsQuery, report, (err) => {
                    if (err) {
                        console.error('❌ Error inserting test report:', err);
                    } else {
                        console.log('✅ Test report inserted successfully.');
                    }
                });
            });
        });
    });
};

seedReports();

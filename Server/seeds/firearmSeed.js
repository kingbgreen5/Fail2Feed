const db = require('../config/db');

const seedFirearm = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS firearm (
            id INT AUTO_INCREMENT PRIMARY KEY,
            make VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            rounds_fired INT DEFAULT 0,
            reports_filed INT DEFAULT 0
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating firearm table:', err);
            process.exit(1);
        }
        console.log('Firearm table created or already exists.');

        const insertFirearmsQuery = `
            INSERT INTO firearm (make, model, rounds_fired, reports_filed) VALUES
            ('Glock', '19', 500, 4),
            ('Smith & Wesson', 'M&P Shield', 1200, 6),
            ('Sig Sauer', 'P320', 750, 3)
            ON DUPLICATE KEY UPDATE 
                rounds_fired = VALUES(rounds_fired), 
                reports_filed = VALUES(reports_filed);
        `;

        db.query(insertFirearmsQuery, (err) => {
            if (err) {
                console.error('Error inserting firearm data:', err);
                process.exit(1);
            }
            console.log('Firearm data inserted successfully.');
            db.end(); // Close the database connection
            process.exit(0);
        });
    });
};

seedFirearm();

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE firearms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    manufacturing_date YEAR NOT NULL
);

CREATE TABLE range_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    firearm_id INT NOT NULL,
    report_date DATE NOT NULL,
    temperature INT,
    rounds_fired INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (firearm_id) REFERENCES firearms(id) ON DELETE CASCADE
);

CREATE TABLE ammunition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firearm_id INT NOT NULL,
    brand VARCHAR(50) NOT NULL,
    caliber VARCHAR(20) NOT NULL,
    rounds_used INT NOT NULL,
    FOREIGN KEY (firearm_id) REFERENCES firearms(id) ON DELETE CASCADE
);

CREATE TABLE malfunctions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    type ENUM('Failure to Feed', 'Failure to Eject', 'Double Feed', 'Hangfire', 'Light Primer Strike', 'Ammunition Malfunction') NOT NULL,
    count INT NOT NULL,
    FOREIGN KEY (report_id) REFERENCES range_reports(id) ON DELETE CASCADE
    );
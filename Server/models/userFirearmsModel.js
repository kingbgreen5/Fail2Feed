const pool = require("../config/db");

// Add a firearm to the user's profile
const addUserFirearm = async (userId, firearmId) => {
    const existing = await pool.query(
        "SELECT * FROM user_firearms WHERE user_id = ? AND firearm_id = ? AND is_active = 1",
        [userId, firearmId]
    );
    if (existing.length > 0) {
        throw new Error("Firearm already exists in user profile.");
    }

    const result = await pool.query(
        "INSERT INTO user_firearms (user_id, firearm_id) VALUES (?, ?)",
        [userId, firearmId]
    );
    return result.insertId;
};

// Get all active firearms for a user
const getUserFirearms = async (userId) => {
    const result = await pool.query(
        `SELECT uf.id, f.make, f.model, f.caliber, f.manufacture_year, uf.created_at 
         FROM user_firearms uf
         JOIN firearms f ON uf.firearm_id = f.id
         WHERE uf.user_id = ? AND uf.is_active = 1`,
        [userId]
    );
    return result;
};

// Soft delete (mark as inactive) a firearm from a user's profile
const removeUserFirearm = async (userId, firearmId) => {
    const result = await pool.query(
        "UPDATE user_firearms SET is_active = 0 WHERE user_id = ? AND firearm_id = ?",
        [userId, firearmId]
    );
    return result.affectedRows > 0;
};

module.exports = { addUserFirearm, getUserFirearms, removeUserFirearm };

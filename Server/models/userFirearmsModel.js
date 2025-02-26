const db = require("../config/db");
const { QueryTypes } = require('sequelize');

// Add a firearm to the user's profile
const addUserFirearm = async (userId, firearmId) => {
    try {
        const existing = await db.query(
            "SELECT * FROM user_firearms WHERE user_id = ? AND firearm_id = ? AND is_active = 1",
            {
                replacements: [userId, firearmId],
                type: QueryTypes.SELECT
            }
        );

        if (existing.length > 0) {
            throw new Error("Firearm already exists in user profile.");
        }

        const result = await db.query(
            "INSERT INTO user_firearms (user_id, firearm_id) VALUES (?, ?)",
            {
                replacements: [userId, firearmId],
                type: QueryTypes.INSERT
            }
        );
        return result[0]; // Returns the insert ID
    } catch (error) {
        console.error('Error in addUserFirearm:', error);
        throw error;
    }
};

// Get all active firearms for a user
const getUserFirearms = async (userId) => {
    try {
        const rows = await db.query(
            `SELECT uf.id, f.manufacturer, f.model, uf.created_at 
             FROM user_firearms uf
             JOIN firearms f ON uf.firearm_id = f.id
             WHERE uf.user_id = ? AND uf.is_active = 1`,
            {
                replacements: [userId],
                type: QueryTypes.SELECT
            }
        );
        return rows;
    } catch (error) {
        console.error('Error in getUserFirearms:', error);
        throw error;
    }
};

// Soft delete (mark as inactive) a firearm from a user's profile
const removeUserFirearm = async (userId, firearmId) => {
    try {
        const result = await db.query(
            "UPDATE user_firearms SET is_active = 0 WHERE user_id = ? AND firearm_id = ?",
            {
                replacements: [userId, firearmId],
                type: QueryTypes.UPDATE
            }
        );
        return result[1] > 0; // Returns true if any rows were affected
    } catch (error) {
        console.error('Error in removeUserFirearm:', error);
        throw error;
    }
};

module.exports = { addUserFirearm, getUserFirearms, removeUserFirearm };

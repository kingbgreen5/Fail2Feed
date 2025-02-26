const db = require('../models');
const UserFirearms = db.UserFirearms;
const Firearm = db.Firearm;

// Add a firearm to the user's profile
const addUserFirearm = async (userId, firearmId) => {
    try {
        // const existing = await UserFirearms.findOne({
        //     where: {
        //         user_id: userId,
        //         firearm_id: firearmId,
        //         is_active: true
        //     }
        // });

        // if (existing) {
        //     throw new Error("Firearm already exists in user profile.");
        // }

        const result = await UserFirearms.create({
            user_id: userId,
            firearm_id: firearmId
        });
        
        return result.id;
    } catch (error) {
        console.error('Error in addUserFirearm:', error);
        throw error;
    }
};

// Get all active firearms for a user
const getUserFirearms = async (userId) => {
    try {
        const firearms = await UserFirearms.findAll({
            where: {
                user_id: userId,
                is_active: true
            },
            include: [{
                model: Firearm,
                attributes: ['make', 'model']
            }],
            attributes: ['id', 'created_at']
        });
        return firearms;
    } catch (error) {
        console.error('Error in getUserFirearms:', error);
        throw error;
    }
};

// Soft delete (mark as inactive) a firearm from a user's profile
const removeUserFirearm = async (userId, firearmId) => {
    try {
        const result = await UserFirearms.update(
            { is_active: false },
            {
                where: {
                    user_id: userId,
                    firearm_id: firearmId,
                    is_active: true
                }
            }
        );
        return result[0] > 0; // Returns true if any rows were updated
    } catch (error) {
        console.error('Error in removeUserFirearm:', error);
        throw error;
    }
};

module.exports = {
    addUserFirearm,
    getUserFirearms,
    removeUserFirearm
};

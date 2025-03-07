const db = require('../models');
const UserFirearms = db.UserFirearms;
const Firearm = db.Firearm;

// Add a firearm to the user's profile
// const addUserFirearm = async (userId, firearmId) => {
//     try {
//         const result = await UserFirearms.create({
//             user_id: userId,
//             firearm_id: firearmId
//         });
        
//         return result.id;
//     } catch (error) {
//         console.error('Error in addUserFirearm:', error);
//         throw error;
//     }
// };



const addUserFirearm = async (userId, firearmId, modifications) => {
    try {
        const result = await UserFirearms.create({
            user_id: userId,
            firearm_id: firearmId,
            ...modifications // Spread the modifications into the database entry
        });

        return result.id;
    } catch (error) {
        console.error('Error in addUserFirearm:', error);
        throw error;
    }
};








// Get all active firearms for a user
// const getUserFirearms = async (userId) => {
//     try {
//         const firearms = await UserFirearms.findAll({
//             where: {
//                 user_id: userId,
//                 is_active: true
//             },
//             include: [{
//                 model: Firearm,
//                 attributes: ['make', 'model', 'id', 'rounds_fired']
//             }],
//             attributes: ['id', 'created_at']
//         });
//         return firearms;
//     } catch (error) {
//         console.error('Error in getUserFirearms:', error);
//         throw error;
//     }
// };




const getUserFirearms = async (userId) => {
    try {
        const firearms = await UserFirearms.findAll({
            where: {
                user_id: userId,
                is_active: true
            },
            include: [{
                model: Firearm,
                attributes: ['make', 'model', 'id', 'rounds_fired']
            }],
            attributes: { exclude: [] } // Fetch all attributes
        });
        return firearms;
    } catch (error) {
        console.error('Error in getUserFirearms:', error);
        throw error;
    }
};






const removeUserFirearm = async (userId, id) => {
    console.log(`Starting removeUserFirearm for userId: ${userId}, userFirearmId: ${id}`);

    try {
        // Define the update values
        const updateValues = { is_active: 0 };
        console.log('Update Values:', updateValues);

        // Define the WHERE condition
        const whereCondition = {
            user_id: userId,
            id: id,
            is_active: 1
        };
        console.log('Where Condition:', whereCondition);

        // Execute the update operation
        const result = await UserFirearms.update(updateValues, { where: whereCondition });

        console.log('Update Result:', result); // Expecting [number of rows updated]

        const success = result[0] > 0;
        console.log(`Was a row updated? ${success}`);

        return success;
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

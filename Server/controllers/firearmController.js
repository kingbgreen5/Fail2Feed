const db = require('../models');
const Firearm = db.Firearm;

const findFirearmById = async (id) => {
    try {
        const firearm = await Firearm.findOne({
            where: { id }
        });

        return firearm;
    } catch (error) {
        console.error('Error finding firearm by ID:', error);
        throw error;
    }
};






const findFirearmByMakeAndModel = async (make, model) => {
    try {
        const firearm = await Firearm.findOne({
            where: { make, model }
        });

        return firearm;
    } catch (error) {
        console.error("Error finding firearm by make and model:", error);
        throw error;
    }
};






const getFirearmId = async (make, model) => {
    try {
       
        console.log(" GetFirearmID Controller received make:", make, "----received model:", model);
        // Ensure make and model are strings
        if (typeof make !== "string" || typeof model !== "string") {
            throw new Error("Make and model must be strings");
        }

        const firearm = await Firearm.findOne({
            where: { make, model }
        });

        if (!firearm) {
            throw new Error(`Firearm with make: "${make}" and model: "${model}" not found.`);
        }

        return firearm.id;
    } catch (error) {
        console.error("Error finding firearm by make and model:", error);
        throw error;
    }
};



module.exports = {
    getFirearmId,
    findFirearmById,
    findFirearmByMakeAndModel

};

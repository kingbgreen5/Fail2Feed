// const db = require('../config/db');



// // WORK ON THIS AGAIN AFTER USERID AND LOGIN IS FIGURED OUT



// const Report = {
//     getAllReports : (callback) => {
//         db.query('SELECT * FROM reports WHERE is_active = TRUE', callback);
//     },

//     getReportById: (id, callback) => {
//         db.query('SELECT * FROM reports WHERE id = ?', [id], callback);
//     },

//     createReport: (
//         user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
//         firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
//         magazine, ammunition, other, catastrophic, comments, callback
//     ) => {
//         db.query(
//             `INSERT INTO reports 
//             (user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
//             firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
//             magazine, ammunition, other, catastrophic, comments) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
//                 firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
//                 magazine, ammunition, other, catastrophic, comments
//             ],
//             callback
//         );
//     },

//     updateReport: (
//         id, user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
//         firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
//         magazine, ammunition, other, catastrophic, comments, callback
//     ) => {
//         db.query(
//             `UPDATE reports SET user_id = ?, firearm_id = ?, ammo_id = ?, suppressor = ?, optic = ?, modified = ?, 
//             date = ?, manufacture_year = ?, rounds_fired = ?, firing = ?, unlocking = ?, extracting = ?, 
//             ejecting = ?, cocking = ?, feeding = ?, chambering = ?, locking = ?, magazine = ?, ammunition = ?, 
//             other = ?, catastrophic = ?, comments = ? WHERE id = ?`,
//             [
//                 user_id, firearm_id, ammo_id, suppressor, optic, modified, date, manufacture_year, rounds_fired,
//                 firing, unlocking, extracting, ejecting, cocking, feeding, chambering, locking,
//                 magazine, ammunition, other, catastrophic, comments, id
//             ],
//             callback
//         );
//     },


    
//    softDeleteReport: (reportId, callback) => {
//         db.query(
//             'UPDATE reports SET is_active = FALSE WHERE id = ?',
//             [reportId],
//             callback
//         );
//     },
    
//     softDeleteReportByUser: (reportId, userId, callback) => {
//         db.query(
//             'UPDATE reports SET is_active = FALSE WHERE id = ? AND user_id = ?',
//             [reportId, userId],
//             callback
//         );
//     }


// };

// module.exports = Report;



const { Model, DataTypes } = require('sequelize');

class Report extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            firearm_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ammo_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            suppressor: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            optic: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            rounds_fired: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            firing: DataTypes.INTEGER,
            unlocking: DataTypes.INTEGER,
            extracting: DataTypes.INTEGER,
            ejecting: DataTypes.INTEGER,
            cocking: DataTypes.INTEGER,
            feeding: DataTypes.INTEGER,
            chambering: DataTypes.INTEGER,
            locking: DataTypes.INTEGER,
            magazine: DataTypes.INTEGER,
            ammunition: DataTypes.INTEGER,
            other: DataTypes.INTEGER,
            catastrophic: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            comments: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            slide_mod: DataTypes.INTEGER,
            barrel_mod: DataTypes.INTEGER,
            recoilSpring_mod: DataTypes.INTEGER,
            extractor_mod: DataTypes.INTEGER,
            triggerGroup_mod: DataTypes.INTEGER,
            hammer_mod: DataTypes.INTEGER,
            firingPinStriker_mod: DataTypes.INTEGER,
        }, {
            sequelize,
            modelName: 'Report',
            tableName: 'reports',
            timestamps: false,
        });
    }

    // static associate(models) {
    //     this.belongsTo(models.User, { foreignKey: 'user_id' });
    //     this.belongsTo(models.Firearm, { foreignKey: 'firearm_id' });
    // }
}

module.exports = Report;

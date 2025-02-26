const { Model, DataTypes } = require('sequelize');

class Firearm extends Model {
    static init(sequelize) {
        return super.init({
            // id: {
            //     type: DataTypes.INTEGER,
            //     primaryKey: true,
            //     autoIncrement: true
            // },
            // make: {
            //     type: DataTypes.STRING,
            //     allowNull: false
            // },
            // model: {
            //     type: DataTypes.STRING,
            //     allowNull: false
            // }
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            make: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rounds_fired: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            reports_filed: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            is_revolver: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: 'Firearm',
            tableName: 'firearms',
            timestamps: false
        });
    }

    static associate(models) {
        this.hasMany(models.UserFirearms, { foreignKey: 'firearm_id' });
    }
}

module.exports = Firearm;


// const { Model, DataTypes } = require("sequelize");
// // const sequelize = require("../config/db"); // Import the database connection

// class Firearm extends Model {}

// Firearm.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         make: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         model: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         rounds_fired: {
//             type: DataTypes.INTEGER,
//             defaultValue: 0,
//         },
//         reports_filed: {
//             type: DataTypes.INTEGER,
//             defaultValue: 0,
//         },
//         is_active: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: true,
//         },
//         is_revolver: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false,
//         },
//     },
//     {
//         sequelize, // Pass the database connection
//         modelName: "Firearm",
//         tableName: "firearms",
//         timestamps: false, // Disable createdAt and updatedAt timestamps
//     }
// );

// module.exports = Firearm;

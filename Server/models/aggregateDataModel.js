
const { Model, DataTypes } = require('sequelize');

class AggregateData extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firearm_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'firearms', // Ensure this matches your Firearm table name
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            rounds_fired: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            total_malfunctions: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            failure_rate: {
                type: DataTypes.DECIMAL(10, 4), // Stores decimal values accurately
                defaultValue: 0.0000,
            }
        }, {
            sequelize,
            modelName: 'AggregateData',
            tableName: 'aggregate_data',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.Firearm, { foreignKey: 'firearm_id' });
    }
}

module.exports = AggregateData;



























// const { Model, DataTypes } = require('sequelize');

// class AggregateData extends Model {
//     static init(sequelize) {
//         return super.init({
//             id: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//             },
//             firearm_id: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 primaryKey: true, // Ensures upsert works correctly
//                 references: {
//                     model: 'firearms', // Make sure this matches your Firearm table name
//                     key: 'id'
//                 },
//                 onUpdate: 'CASCADE',
//                 onDelete: 'CASCADE'
//             },
//             rounds_fired: {
//                 type: DataTypes.INTEGER,
//                 defaultValue: 0,
//             },
//             total_malfunctions: {
//                 type: DataTypes.INTEGER,
//                 defaultValue: 0,
//             },
//         }, {
//             sequelize,
//             modelName: 'AggregateData',
//             tableName: 'aggregate_data',
//             timestamps: false
//         });
//     }

//     static associate(models) {
//         this.belongsTo(models.Firearm, { foreignKey: 'firearm_id' });
//     }
// }

// module.exports = AggregateData;












// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     class AggregateData extends Model {}

//     AggregateData.init({
//         firearm_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true, // Ensures upsert works correctly
//         },
//         rounds_fired: {
//             type: DataTypes.INTEGER,
//             defaultValue: 0,
//         },
//         total_malfunctions: {
//             type: DataTypes.INTEGER,
//             defaultValue: 0,
//         },
//     }, {
//         sequelize,
//         modelName: 'AggregateData',
//         tableName: 'aggregate_data',
//         timestamps: false
//     });

//     return AggregateData;
// };

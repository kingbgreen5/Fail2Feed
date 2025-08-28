const { Model, DataTypes } = require('sequelize');

class AggregateData extends Model {
    static init(sequelize) {
        return super.init({
                id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                },
                firearm_id: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  unique: true,
                },
                rounds_fired: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                total_malfunctions: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                failure_rate: {
                  type: DataTypes.DECIMAL(10, 4),
                  defaultValue: null,
                },
                firing_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                unlocking_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                extracting_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                ejecting_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                cocking_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                feeding_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                chambering_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                locking_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                magazine_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                ammunition_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                other_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
                catastrophic_total: {
                  type: DataTypes.INTEGER,
                  defaultValue: null,
                },
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

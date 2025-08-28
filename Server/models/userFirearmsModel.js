// const { Model, DataTypes } = require('sequelize');

// class UserFirearms extends Model {
//     static init(sequelize) {
//         return super.init({
//            id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   firearm_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   is_active: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: true
//   },
//   slide_mod: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   },
//   barrel_mod: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   },
//   recoilSpring_mod: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   },
//   extractor_mod: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   },
//   triggerGroup_mod: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   },
//   hammer_mod: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   },
//   firingPinStriker_mod: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   }
//         }, {
//             sequelize,
//             modelName: 'user_firearms',
//             tableName: 'user_firearms',
//             timestamps: false
//         });
//     }

//     static associate(models) {
//         this.belongsTo(models.Firearm, { foreignKey: 'firearm_id' });
//         // this.belongsTo(models.User, { foreignKey: 'user_id' });
//     }
// }

// module.exports = UserFirearms;




const { Model, DataTypes } = require('sequelize');

class UserFirearms extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            firearm_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            slide_mod: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            barrel_mod: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            recoilspring_mod: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            extractor_mod: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            triggergroup_mod: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            hammer_mod: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            firingpinstriker_mod: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            sequelize,
            modelName: 'user_firearms',
            tableName: 'user_firearms',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.Firearm, { foreignKey: 'firearm_id' });
        // this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
}

module.exports = UserFirearms;

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
                defaultValue: 1
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            slide_mod: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            barrel_mod: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            recoilSpring_mod: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            extractor_mod: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            triggerGroup_mod: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            hammer_mod: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            firingPinStriker_mod: {
                type: DataTypes.INTEGER,
                defaultValue: 0
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

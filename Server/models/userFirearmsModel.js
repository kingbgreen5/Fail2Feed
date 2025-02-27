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
                defaultValue: true
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
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
    }
}

module.exports = UserFirearms;

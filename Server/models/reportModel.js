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
            recoilspring_mod: DataTypes.INTEGER,
            extractor_mod: DataTypes.INTEGER,
            triggergroup_mod: DataTypes.INTEGER,
            hammer_mod: DataTypes.INTEGER,
            firingpinstriker_mod: DataTypes.INTEGER,
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

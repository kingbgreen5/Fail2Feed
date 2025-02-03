const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ammunition = sequelize.define("Ammunition", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caliber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grains: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Ammunition;

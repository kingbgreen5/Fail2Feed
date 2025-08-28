
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'gun',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'Welcome1',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {
    sequelize,
    Sequelize
};

// Import models
const Firearm = require('./firearmModel');
const UserFirearms = require('./userFirearmsModel');
const Report = require('./reportModel'); 
const AggregateData = require('./aggregateDataModel');
const User = require('./userModel');



// Initialize models (Pass `sequelize` and `DataTypes`)
db.Firearm = Firearm.init(sequelize, DataTypes);
db.UserFirearms = UserFirearms.init(sequelize, DataTypes);
db.Report = Report.init(sequelize, DataTypes); 
db.AggregateData = AggregateData.init(sequelize, DataTypes); 
db.User = User;


// Run associations
Object.values(db).forEach((model) => {
    if (model.associate && typeof model.associate === 'function') {
        model.associate(db);
    }
});

module.exports = db;



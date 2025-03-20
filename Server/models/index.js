
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'gun',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'Welcome1',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
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

// Initialize models
db.Firearm = Firearm.init(sequelize);
db.UserFirearms = UserFirearms.init(sequelize);
db.Report = Report.init(sequelize); 
db.AggregateData = AggregateData.init(sequelize); 


// Run associations
Object.values(db).forEach((model) => {
    if (model.associate && typeof model.associate === 'function') {
        model.associate(db);
    }
});

module.exports = db;

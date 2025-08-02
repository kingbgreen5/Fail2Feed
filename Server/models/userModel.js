// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const bcrypt = require('bcrypt');

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true
//         }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     role: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: 'user'
//     },
//     is_active: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true
//     },
//     is_verified: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     verification_token: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     reset_token: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     reset_token_expiry: {
//         type: DataTypes.DATE,
//         allowNull: true
//     }
// }, {
//     tableName: 'users',
//     timestamps: false, 
//     underscored: true 
// });


// User.prototype.comparePassword = async function(password) {
//     return await bcrypt.compare(password, this.password);
// };

// User.beforeCreate(async (user) => {
//     if (user.password) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//     }
// });

// User.beforeUpdate(async (user) => {
//     if (user.changed('password')) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//     }
// });

// User.getAllUsers = async function() {
//     return await User.findAll({ where: { is_active: true } });
// };

// User.getUserById = async function(id) {
//     return await User.findOne({ where: { id, is_active: true } });
// };

// User.getUserByEmail = async function(email) {
//     return await User.findOne({ where: { email, is_active: true } });
// };

// User.storeVerificationToken = async function(userId, token) {
//     return await User.update({ verification_token: token }, { where: { id: userId } });
// };

// User.verifyUserByToken = async function(token) {
//     return await User.update({ is_verified: true, verification_token: null }, { where: { verification_token: token } });
// };

// User.storeResetToken = async function(email, token, expiry) {
//     return await User.update({ reset_token: token, reset_token_expiry: expiry }, { where: { email } });
// };

// User.resetPassword = async function(token, newPassword) {
//     const user = await User.findOne({ where: { reset_token: token, reset_token_expiry: { [sequelize.Op.gt]: new Date() } } });
//     if (!user) return null;
//     user.password = newPassword;
//     await user.save();
//     return user;
// };

// User.createUser = async function(username, email, password, role = 'user', verificationToken) {
//     return await User.create({ username, email, password, role, verification_token: verificationToken });
// };

// User.updateUser = async function(id, username, email, password) {
//     const user = await User.findByPk(id);
//     if (!user) return null;
//     user.username = username;
//     user.email = email;
//     if (password) {
//         user.password = password;
//     }
//     await user.save();
//     return user;
// };

// User.softDeleteUser = async function(id) {
//     return await User.update({ is_active: false }, { where: { id } });
// };

// User.isAdmin = async function(id) {
//     const user = await User.findByPk(id);
//     return user && user.role === 'admin';
// };

// module.exports = User;



const { Model, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this is correctly exporting sequelize
const bcrypt = require('bcrypt');

class User extends Model {
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    static async getAllUsers() {
        return await this.findAll({ where: { is_active: true } });
    }

    static async getUserById(id) {
        return await this.findOne({ where: { id, is_active: true } });
    }

    static async getUserByEmail(email) {
        return await this.findOne({ where: { email, is_active: true } });
    }

    static async storeVerificationToken(userId, token) {
        return await this.update({ verification_token: token }, { where: { id: userId } });
    }

    static async verifyUserByToken(token) {
        return await this.update({ is_verified: true, verification_token: null }, { where: { verification_token: token } });
    }

    static async storeResetToken(email, token, expiry) {
        return await this.update({ reset_token: token, reset_token_expiry: expiry }, { where: { email } });
    }

    static async resetPassword(token, newPassword) {
        const user = await this.findOne({ where: { reset_token: token, reset_token_expiry: { [Op.gt]: new Date() } } });
        if (!user) return null;
        user.password = newPassword;
        await user.save();
        return user;
    }

    static async createUser(username, email, password, role = 'user', verificationToken) {
        return await this.create({ username, email, password, role, verification_token: verificationToken });
    }

    static async updateUser(id, username, email, password) {
        const user = await this.findByPk(id);
        if (!user) return null;
        user.username = username;
        user.email = email;
        if (password) {
            user.password = password;
        }
        await user.save();
        return user;
    }

    static async softDeleteUser(id) {
        return await this.update({ is_active: false }, { where: { id } });
    }

    static async isAdmin(id) {
        const user = await this.findByPk(id);
        return user && user.role === 'admin';
    }
}

// Initialize model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        verification_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reset_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reset_token_expiry: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize, // Make sure Sequelize instance is passed
        tableName: 'users',
        timestamps: false,
        underscored: true,
        modelName: 'User'
    }
);

// Hash password before creating or updating
User.beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

module.exports = User;

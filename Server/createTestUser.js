const User = require('./models/userModel');
const sequelize = require('./config/db');

async function createTestUser() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');

        const testUser = await User.create({
            username: 'testuser',
            email: 'test@test.com',
            password: 'password123', // This will be automatically hashed by the model hooks
            role: 'user',
            is_active: true,
            is_verified: true
        });

        console.log('Test user created:', testUser.email);
        process.exit(0);
    } catch (error) {
        console.error('Error creating test user:', error);
        process.exit(1);
    }
}

createTestUser();

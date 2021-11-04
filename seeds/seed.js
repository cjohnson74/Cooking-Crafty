const sequelize = require('../config/connection');
const { User, Recipe, Ingredient } = require('../models');

const userData = require('./userData.json')
const recipeData = require('./recipeData.json');
const ingredientData = require('./ingredientData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const recipe of recipeData) {
        await Recipe.create({
            ...recipe,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};
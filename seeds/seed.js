const sequelize = require('../config/connection');
const { User, Recipe, Ingredient } = require('../models');

const recipeData = require('./recipeData.json');
const ingredientData = require('./ingredientData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    process.exit(0);
};
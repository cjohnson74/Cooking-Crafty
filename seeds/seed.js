const sequelize = require('../config/connection');
const { User, Recipe, Ingredient, RecipeIngredient, UserRecipe } = require('../models');

const userData = require('./userData.json')
const recipeData = require('./recipeData.json');
const ingredientData = require('./ingredientData.json');
const RecipeIngredientData = require('./recipeIngredientData.json');
const userRecipeData = require('./userRecipeData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const recipes = await Recipe.bulkCreate(recipeData, {
            individualHooks: true,
            returning: true,
    });

    const ingredients = await Ingredient.bulkCreate(ingredientData, {
        individualHooks: true,
        returning: true,
    });

    const recipeIngredients = await RecipeIngredient.bulkCreate(RecipeIngredientData, {
        individualHooks: true,
        returning: true,
    });

    const userRecipes = await UserRecipe.

    process.exit(0);
};

seedDatabase();
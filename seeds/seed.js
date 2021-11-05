const sequelize = require('../config/connection');
const {
  Ingredient,
  RecipeIngredient,
  Recipe
} = require('../models');

const ingredientData = require('./ingredientData.json');
const recipeIngredientData = require('./recipeIngredientData.json');
const recipeData = require('./recipeData.json')

const seed = async () => {
  await sequelize.sync({ force: true });

  //   const userRecipes = await UserRecipe.bulkCreate(userRecipeData, {
  //     individualHooks: true,
  //     returning: true,
  //   });

  const recipes = await Recipe.bulkCreate(recipeData, {
    individualHooks: true,
    returning: true,
  });

  const ingredients = await Ingredient.bulkCreate(ingredientData, {
    individualHooks: true,
    returning: true,
  });

  const recipeIngredients = await RecipeIngredient.bulkCreate(
    recipeIngredientData,
    {
      individualHooks: true,
      returning: true,
    }
  );

  process.exit(0);
};

seed();
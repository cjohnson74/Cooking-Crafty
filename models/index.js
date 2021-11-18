const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const UserRecipe = require('./UserRecipe');
const RecipeIngredient = require('./RecipeIngredient.js');

// User.hasMany(Recipe);

// User.hasMany(UserRecipe);

// Recipe.hasMany(UserRecipe);

// Recipe.hasMany(Ingredient);

Recipe.belongsToMany(User, {
    through: {
        model: UserRecipe,
    },
    foreignKey: "recipe_id"
});

User.belongsToMany(Recipe, {
    through: {
        model: UserRecipe,
    },
    foreignKey: "user_id"
});

Recipe.belongsToMany(Ingredient, {
    through: {
        model: RecipeIngredient,
    },
    foreignKey: "ingredient_id"
});

Ingredient.belongsToMany(Recipe, {
    through: {
        model: RecipeIngredient,
    },
    foreignKey: "recipe_id"
});

module.exports = {
    User,
    Recipe,
    Ingredient,
    UserRecipe,
    RecipeIngredient,
 };
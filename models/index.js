const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const UserRecipe = require('./UserRecipe');
const RecipeIngredient = require('./RecipeIngredient.js');

User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Ingredient, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Recipe.hasMany(User, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

Recipe.hasMany(Ingredient, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

Ingredient.hasMany(Recipe, {
    foreignKey: 'ingredient_id',
    onDelete: 'CASCADE'
});

Ingredient.hasMany(User, {
    foreignKey: 'ingredient_id',
    onDelete: 'CASCADE'
})


Recipe.belongsToMany(User, {
    through: {
        model: UserRecipe,
        unique: false,
    },
    as: "recipe_users"
});

Recipe.belongsToMany(Ingredient, {
    through: {
        model: RecipeIngredient,
        unique: false,
    },
    as: "recipe_ingredients"
});

User.belongsToMany(Recipe, {
    through: {
        model: UserRecipe,
        unique: false,
    },
    as: "user_recipes"
});

Ingredient.belongsToMany(Recipe, {
    through: {
        model: RecipeIngredient,
        unique: false,
    },
    as: "ingredient_recipes"
});

module.exports = { User, Recipe, Ingredient };
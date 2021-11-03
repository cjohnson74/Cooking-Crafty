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
    },
    foreignKey: "user_id"
});

Recipe.belongsToMany(Ingredient, {
    through: {
        model: RecipeIngredient,
        unique: false,
    },
    foreignKey: "ingredient_id"
});

User.belongsToMany(Recipe, {
    through: {
        model: UserRecipe,
    },
    foreignKey: "recipe_id"
});

Ingredient.belongsToMany(Recipe, {
    through: {
        model: RecipeIngredient,
        unique: false,
    },
    foreignKey: "recipe_id"
});

module.exports = { User, Recipe, Ingredient };
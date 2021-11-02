const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const UserRecipe = require('./UserRecipe');
const UserIngredient = require('./UserIngredient');
const RecipeIngredient = require('./RecipeIngredient');

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
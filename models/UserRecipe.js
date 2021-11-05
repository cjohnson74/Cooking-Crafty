const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserRecipe extends Model {}

UserRecipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize: sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_recipe',
    }
);

module.exports = UserRecipe;
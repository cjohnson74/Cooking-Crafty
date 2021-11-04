const fetch = require('node-fetch');
const { writeArrayToJSON } = require('../utils/helpers');
const fs = require('fs');

// gets the number of recipes created already by reading the userRecipeData.json parsing it to make it an array. Then get its length.
var recipeCount = JSON.parse(fs.readFileSync('./seeds/userRecipeData.json', 'utf8')).length;

// gets the number of ingredients created already by reading the recipeIngredientData.json parsing it to make it an array. Then get its length.
var ingredientCount = JSON.parse(fs.readFileSync('./seeds/recipeIngredientData.json', 'utf8')).length;

const fillIngredientJson = async (recipeCount, ingredientCount) => {
  const searchedRecipe = 'pie';

  const properSearchRecipe = searchedRecipe.replace(/ /g, '%20');

  const recipeArray = [];
  const ingredientsArray = [];
  const recipeIngredientArray = [];
  const userRecipeArray = [];

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${properSearchRecipe}&app_id=19224618&app_key=c855fa0b4fff67aaf62cd192e24a652b`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.hits.length; i++) {
        // prints the recipe name to the console
        console.log(data.hits[i].recipe.label);
        // prints the recipe url to the console
        console.log(data.hits[i].recipe.url);
        var recipe = {
          name: data.hits[i].recipe.label,
          description: data.hits[i].recipe.url,
          image: data.hits[i].recipe.label.image,
        };
        // adds the recipe objects { name: "", url: "" } to the recipe array
        recipeArray[i] = recipe;
        // keeps track of the number of recipes in json
        recipeCount++;
        // creates the userRecipe object { recipe_id: recipeCount }
        var userRecipeObject = { recipe_id: recipeCount };
        // adds to the userRecipe array
        userRecipeArray.push(userRecipeObject);

        for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
          // keeps track of the number of ingredients in json
          ingredientCount++;
          // console.log(data.hits[i].recipe.ingredients);
          // prints the ingredients to the console
          console.log(data.hits[i].recipe.ingredients[j].food);
          // creates the recipe object { name: "", recipe_id: i } to the recipe array
          var ingredientObject = {
            name: data.hits[i].recipe.ingredients[j].food,
            recipe_id: recipeCount,
          };
          // adds to the Ingrient object to the array
          ingredientsArray.push(ingredientObject);
          // creates the recipeIngredient object { recipe_id: recipeCount, ingredient_id: ingredientCount }
          var recipeIngredientObject = {
            recipe_id: recipeCount,
            ingredient_id: ingredientCount,
          };
          // adds to the recipeIngredient object to the array
          recipeIngredientArray.push(recipeIngredientObject);
        };
      };
      // adds the recipeArray to the recipeArray to the recipeData.json
      writeArrayToJSON(recipeArray, './seeds/recipeData.json');
      // adds the ingredientsArray to the ingredientData.json
      writeArrayToJSON(ingredientsArray, "./seeds/ingredientData.json");
      // adds the recipeIngredientsArray to recipeIngredientData.json
      writeArrayToJSON(recipeIngredientArray, "./seeds/recipeIngredientData.json");
      // adds the userRecipeArray to userRecipeData.json
      writeArrayToJSON(userRecipeArray, "./seeds/userRecipeData.json");
    });
};

fillIngredientJson(recipeCount, ingredientCount);
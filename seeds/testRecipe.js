const fetch = require('node-fetch');
const fs = require('fs');
var recipeCount = 360;
var ingredientCount = 0;

// this adds an array we want to add to a json file
const writeToJSON = (arrayToAdd, jsonFilePath) => {
  // prints the ingredientsArray to the console
  // console.log(JSON.stringify(array));
  // reads the ingredientData.json file
  const readData = fs.readFileSync(jsonFilePath, 'utf8');
  // parsing the read json file into an array
  const currentData = JSON.parse(readData);
  // stringifying then parsing the ingredientsArray into an array
  // var newArray = JSON.parse(JSON.stringify(array));
  // combining the read ingredients with the new ingredients into one array
  var finalDataArray = currentData.concat(arrayToAdd);
  // writes the finalDataArray to the jsonFile
  fs.writeFileSync(jsonFilePath, JSON.stringify(finalDataArray), (err) => {
    console.log(err);
  });
};

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
        };
        // adds the recipe objects { name: "", url: "" } to the recipe array
        recipeArray[i] = recipe;
        // keeps track of the number of recipes in json
        recipeCount++;

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
          // creates the userRecipe object { recipe_id: recipeCount }
          var userRecipeObject = { recipe_id: recipeCount };
          // adds to the userRecipe array
          userRecipeArray.push(userRecipeObject);
        };
      };
      // adds the recipeArray to the recipeArray to the recipeData.json
      writeToJSON(recipeArray, './seeds/recipeData.json');
      // adds the ingredientsArray to the ingredientData.json
      writeToJSON(ingredientsArray, "./seeds/igredientData.json");
      // adds the recipeIngredientsArray to recipeIngredientData.json
      writeToJSON(recipeIngredientArray, "./seeds/recipeIngredientData.json");
      // adds the userRecipeArray to userRecipeData.json
      writeToJSON(userRecipeArray, "./seeds/userRecipeData.json");
    });
};

fillIngredientJson(recipeCount, ingredientCount);

// require('dotenv').config('../.env');
// const fetch = require('node-fetch')
// const fs = require('fs');

// const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public`;

// apiQuery = (query) => {
//     let apiCall = `${apiUrl}&q=peanut&app_id=19224618&app_key=c855fa0b4fff67aaf62cd192e24a652b`

//     fetch(apiCall)
//     .then(function (response) {
//         if(!response.ok) {
//             throw response.json();
//         }

//         fs.writeFile('testing.json', response.json());
//     });
// };

// apiQuery();

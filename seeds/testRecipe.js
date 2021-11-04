const fetch = require('node-fetch');
const fs = require('fs');
var recipeCount = 360;

const fillIngredientJson = async (recipeCount) =>  {
const searchedRecipe = 'pie';
  
const properSearchRecipe = searchedRecipe.replace(/ /g,'%20');

const recipeArray = [];
const ingredientsArray = [];

const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${properSearchRecipe}&app_id=19224618&app_key=c855fa0b4fff67aaf62cd192e24a652b`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                for(let i = 0; i < data.hits.length; i++) {
                    // prints the recipe name to the console
                    console.log(data.hits[i].recipe.label);
                    // prints the recipe url to the console
                    console.log(data.hits[i].recipe.url);
                    var recipe = { name: data.hits[i].recipe.label, description: data.hits[i].recipe.url };
                    // adds the recipe objects { name: "", url: "" } to the recipe array
                    recipeArray[i] = recipe;
                    // keeps track of the number of recipes in json
                    recipeCount++;

                    for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
                        // console.log(data.hits[i].recipe.ingredients);
                        // prints the ingredients to the console
                        console.log(data.hits[i].recipe.ingredients[j].food);
                        // adds the recipe objects { name: "", recipe_id: i } to the recipe array
                        var ingredientObject = { name: data.hits[i].recipe.ingredients[j].food, recipe_id: recipeCount };
                        ingredientsArray.push(ingredientObject);
                    }
                }
                // prints the recipeArray to the console
                console.log(JSON.stringify(recipeArray));
                // reads the recipeData.json file
                const prevRecipes = fs.readFileSync('./seeds/recipeData.json', 'utf8');
                const currentRecipes = JSON.parse(prevRecipes);
                var newRecipes = JSON.parse(JSON.stringify(recipeArray));
                var finalRecipes = currentRecipes.concat(newRecipes);
                // writes to the recipeData.json file
                fs.writeFileSync('./seeds/recipeData.json', JSON.stringify(finalRecipes), (err) => {
                    console.log(err);
                });
                // prints the ingredientsArray to the console
                // console.log(JSON.stringify(ingredientsArray));
                // reads to the ingredientData.json file
                const prevIngredients = fs.readFileSync('./seeds/ingredientData.json', 'utf8');
                const currentIngredients = JSON.parse(prevIngredients);
                var newIngredients = JSON.parse(JSON.stringify(ingredientsArray));
                var finalIngredients = currentIngredients.concat(newIngredients);
                //writes to the ingredientsData.json file
                fs.writeFileSync('./seeds/ingredientData.json', JSON.stringify(finalIngredients), (err) => {
                    console.log(err);
                });
            });
}

fillIngredientJson(recipeCount);

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
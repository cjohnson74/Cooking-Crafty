
const fetch = require('node-fetch');

const fillIngredientJson = async => {
const searchedRecipe = 'egg and cheese';
  
const properSearchRecipe = searchedRecipe.replace(/ /g,'%20');

const recipeArray = [];
const ingredientsArray = [];

const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${properSearchRecipe}&app_id=19224618&app_key=c855fa0b4fff67aaf62cd192e24a652b`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                for(let i = 0; i < data.hits.length; i++ ) {
                    // prints the recipe name to the console
                    console.log(data.hits[i].recipe.label);
                    // prints the recipe url to the console
                    console.log(data.hits[i].recipe.url);
                    var recipe = { name: data.hits[i].recipe.label, description: data.hits[i].recipe.url }
                    // adds the recipe objects { name: "", url: "" } to the recipe array
                    recipeArray[i] = JSON.stringify(recipe);

                    for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
                        // console.log(data.hits[i].recipe.ingredients);
                        // prints the ingredients to the console
                        console.log(data.hits[i].recipe.ingredients[j].food);
                        // adds the recipe objects { name: "", recipe_id: i } to the recipe array
                        ingredientsArray.push(JSON.stringify({ name: data.hits[i].recipe.ingredients[j].food, recipe_id: i}));
                    }
                }
                // prints the recipeArray to the console
                console.log(recipeArray);
                // reads the recipeData.json file

                // writes to the recipeData.json file

                // prints the ingredientsArray to the console
                console.log(ingredientsArray);
                // reads to the ingredientData.json file

                //writes to the ingredientsData.json file
                
            });
}

fillIngredientJson();

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
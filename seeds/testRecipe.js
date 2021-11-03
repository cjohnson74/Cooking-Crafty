
const fetch = require('node-fetch');

const fillIngredientJson = async => {
const searchedRecipe = 'egg and cheese';
  
const properSearchRecipe = searchedRecipe.replace(/ /g,'%20');

const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${properSearchRecipe}&app_id=19224618&app_key=c855fa0b4fff67aaf62cd192e24a652b`;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for(let i = 0; i < data.hits.length; i++ ) {
                    console.log(data.hits[i].recipe.label);
                    console.log(data.hits[i].recipe.url);
                    for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
                    console.log(data.hits[i].recipe.ingredients[j].food);
                    }
                }
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
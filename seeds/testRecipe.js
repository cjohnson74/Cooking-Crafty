function fillIngredientJson() {
const searchedRecipe = 'egg and cheese';

const properSearchRecipe = searchedRecipe.replace(/ /g,'%20');

const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${properSearchRecipe}&app_id=19224618&app_key=c855fa0b4fff67aaf62cd192e24a652b`;

    fetch(url)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        });
}

fillIngredientJson();
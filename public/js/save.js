const addToUserSavedRecipes = async (event) => {
    event.preventDefault();
    console.log("I have been clicked")
}


document
    .querySelectorAll("saverecipe")
    .addEventListener("click", addToUserSavedRecipes)
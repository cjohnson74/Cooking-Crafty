const addSavedRecipe = async (event) => {
    event.preventDefault();
    var recipe_id = event.target.dataset.id;
    
    await fetch('/api/users/addsavedrecipe/' + recipe_id, {
        method: 'POST',
        headers: { 
            'Content-Type': 
            'application/json', 
        },
    })
};

var saveButton = document.querySelectorAll(".saverecipe");
console.log(saveButton);
saveButton.forEach((button) => {
    button.addEventListener("click", addSavedRecipe);
});
const fs = require('fs');
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  // this adds an array to a json file
  writeArrayToJSON: (arrayToAdd, jsonFilePath) => {
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
  },
};

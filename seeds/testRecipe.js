require('dotenv').config('../.env');
const fs = require('fs');

const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public`;

apiQuery = (query) => {
    let apiCall = `${apiUrl}&q=peanut&app_id=19224618&app_key=c855fa0b4fff67aaf62cd192e24a652b`

    fetch(apiCall)
    .then(function (response) {
        if(!response.ok) {
            throw response.json();
        }

        fs.writeFile('testing.json', response.json());
    });
};

apiQuery();
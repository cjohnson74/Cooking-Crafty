const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Need to setup routes before calling
//app.use(routes);

app.listen(PORT, () => console.log('Now listening on http://localhost:3001'));
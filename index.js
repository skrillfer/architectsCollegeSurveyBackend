const mongoose = require('mongoose');
var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

require('dotenv').config({ path: '../vars.env' });

var app = express();
var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

app.use(express.json()); // Make sure it comes back as json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to database MySQL --- using Sequelize
const db = require("./Sequalize/Models");
db.sequelize.sync();
//Connect to database MySQL --- using Sequelize

// Set routes
require('./Sequelize/Routes/Survey.Routes')(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

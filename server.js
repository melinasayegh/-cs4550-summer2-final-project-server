const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const unirest = require('unirest');

app.use(function(req, res, next) {
    // change this to heroku page after!!
    //res.header("Access-Control-Allow-Origin", "https://community-cookings.herokuapp.com");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

mongoose.connect('mongodb://user:webdev2018@ds119442.mlab.com:19442/cs4550-summer2-final-project', function(err, db) {
    if(!err) {
        console.log("Connected to database.");
    } else {
        console.log("Error connecting to database.");
    }
});



require('./services/user.service.server')(app);
require('./services/recipe.service.server')(app);
// require('./services/review.service.server')(app);

app.listen(process.env.PORT || 3000);
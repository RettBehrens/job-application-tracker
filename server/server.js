/* jshint esversion: 6 */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

require('./models/index');
require('./config/passport');

// request logging
app.use(morgan('dev'));

// API config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(passport.initialize());

app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({'message' : err.name + ': ' + err.message});
    }
});

// routes
const profileRoutes = require('./routes/profile.js');
const authenticationRoutes = require('./routes/authentication.js');
app.use(profileRoutes);
app.use(authenticationRoutes);

// start server
app.listen(port, () => {
    console.log(`server running on ${port}`);
});
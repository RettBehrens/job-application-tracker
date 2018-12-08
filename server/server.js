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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: err.name + ': ' + err.message });
  }
});

// routes
const profileRoutes = require('./routes/profile.js');
const authenticationRoutes = require('./routes/authentication.js');
const applicationRoutes = require('./routes/application.js');
app.use(profileRoutes);
app.use(authenticationRoutes);
app.use(applicationRoutes);

const forceSSL = function() {
  return function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  };
};

app.use(forceSSL());

app.use(express.static(path.join(__dirname, '../client/dist/job-application-tracker')));

app.get('/', function(req, res) {
  if (port === '3000') {
    res.sendFile('/client/dist/job-application-tracker/index.html');
  } else {
    res.sendFile('/app/client/dist/job-application-tracker/index.html');
  }
});

app.get('/login', function(req, res) {
  if (port === '3000') {
    res.sendFile('/client/dist/job-application-tracker/index.html');
  } else {
    res.sendFile('/app/client/dist/job-application-tracker/index.html');
  }
});

app.get('/register', function(req, res) {
  if (port === '3000') {
    res.sendFile('/client/dist/job-application-tracker/index.html');
  } else {
    res.sendFile('/app/client/dist/job-application-tracker/index.html');
  }
});

app.get('/profile', function(req, res) {
  if (port === '3000') {
    res.sendFile('/client/dist/job-application-tracker/index.html');
  } else {
    res.sendFile('/app/client/dist/job-application-tracker/index.html');
  }
});

app.get('/details', function(req, res) {
  if (port === '3000') {
    res.sendFile('/client/dist/index.html');
  } else {
    res.sendFile('/app/client/dist/index.html');
  }
});

// start server
app.listen(port, () => {
  console.log(`server running on ${port}`);
});

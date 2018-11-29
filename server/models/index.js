/* jshint esversion: 6 */

const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGOBD_URI ||
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/job-application-tracker'
)
.then(() => console.log('connection successful'))
.catch((err) => console.log(err));

module.exports.User = require('./user.js');
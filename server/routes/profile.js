/* jshint esversion: 6 */

const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const jwtSecret = process.env.jwtSecret || require("../env.js").jwtSecret;
const auth = jwt({
  secret: jwtSecret,
  userProperty: "payload"
});

const profileController = require('../controllers/profile');

router.route('/api/profile').get(auth, profileController.profileRead);

module.exports = router;
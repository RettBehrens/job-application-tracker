/* jshint esversion: 6 */

const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const jwtSecret = process.env.jwtSecret || require("../env.js").jwtSecret;
const auth = jwt({
  secret: jwtSecret,
  userProperty: "payload"
});

const applicationController = require("../controllers/application");

router.route("/api/application").post(auth, applicationController.postApplication);

module.exports = router;

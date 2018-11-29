/* jshint esversion: 6 */

const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authentication");

router.route("/api/register").post(authenticationController.register);

router.route("/api/login").post(authenticationController.login);

module.exports = router;

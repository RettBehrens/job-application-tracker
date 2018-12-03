/* jshint esversion: 6 */

const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/application");

router.route("/api/application").post(applicationController.postApplication);

module.exports = router;

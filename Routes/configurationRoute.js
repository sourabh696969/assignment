const express = require("express");
const { createConfiguration, getConfiguration, updateConfiguration } = require("../controllers/configurationController");
const {validateUserToken} = require('../middleware/validateTokenHandler'); 
const router = express.Router();

router.post("/create", validateUserToken, createConfiguration);
router.get("/:id", getConfiguration);
router.put("/update/:id", updateConfiguration);

module.exports = router;

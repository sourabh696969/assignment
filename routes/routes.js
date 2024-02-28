const express = require("express");
const router = express.Router();

router.use("/user", require("./userRoute"));
router.use("/configuration", require("./configurationRoute"));

module.exports = router;

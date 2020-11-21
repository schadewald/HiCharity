const router = require("express").Router(),
    DBRoutes = require("./DBRoutes.js");

router.use("/", DBRoutes);

module.exports = router;
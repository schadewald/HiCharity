const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    donationRoutes = require("./donationRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/donations", donationRoutes);
router.use("/api", apiRoutes);

module.exports = router;
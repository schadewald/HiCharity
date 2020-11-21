const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    donationRoutes = require("./donationRoutes"),
    homeRoutes = require("./homeRoutes"),
    errorRoutes = require("./errorRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/donations", donationRoutes);
router.use("/api", apiRoutes);
// router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
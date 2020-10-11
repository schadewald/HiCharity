const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");

router.use("/api", apiRoutes);
router.use("/user", userRoutes);
router.use("/", homeRoutes);

module.exports = router;
const router = require("express").Router(),
    donationController = require("../controllers/donationController");

router.get("/donations", donationController.index,
    donationController.respondJSON);
router.use(donationController.errorJSON);

module.exports = router;
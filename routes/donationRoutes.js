const router = require("express").Router(),
    donationController = require("../controllers/donationController");

router.get("/donate", donationController.new);

router.post("/donate", donationController.create, donationController.redirectView);

module.exports = router;
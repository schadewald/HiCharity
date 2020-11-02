const router = require("express").Router(),
    donationController = require("../controllers/donationController");

router.get("/donate", donationController.new);

router.post("/donate", donationController.validate, donationController.create, donationController.redirectView);

router.get("/donationList", donationController.index, donationController.indexView);

module.exports = router;
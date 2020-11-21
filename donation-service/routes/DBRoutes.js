const router = require("express").Router(),
    DBController = require("../controllers/DBController.js");

router.post("/donation", DBController.create);
router.get("/dummy", DBController.getDummy);

module.exports = router;
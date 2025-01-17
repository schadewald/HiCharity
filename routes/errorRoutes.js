const router = require("express").Router(),
    homeController = require("../controllers/homeController");

router.get("*", homeController.respondWithBadRequest);
//localhost:8080/anything-not-yet-defined

module.exports = router;
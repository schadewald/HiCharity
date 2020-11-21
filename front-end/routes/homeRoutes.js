const router = require("express").Router(),
    homeController = require("../controllers/homeController");

router.get("/", homeController.repondWithHomePage);
//localhost:8080/

router.post("/", homeController.displayRequest);

router.get("/name/:myName", homeController.respondWithName);

module.exports = router;
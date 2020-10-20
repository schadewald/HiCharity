const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.sendHomePage);
//localhost:8080/
router.post("/", homeController.displayRequest);
router.get("/useraccount", homeController.sendUserAccount);
//localhost:8080/useraccount
router.get("/donation", homeController.sendDonation);
//localhost:8080/donation
router.get("/home_page/:myName", homeController.repondWithHomePage);
//localhost:8080/home_page/whater-name-you-put
router.get("/name/:myName", homeController.respondWithName);
//localhost:8080/name/whater-name-you-put
router.get("*", homeController.respondWithBadRequest);
//localhost:8080/anything-not-yet-defined


module.exports = router;
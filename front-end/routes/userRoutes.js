const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/userList", userController.index, userController.indexView);
//localhost:8080/user

router.get("/login", userController.new);

router.post("/login", userController.create, userController.redirectView);

router.get("/:id", userController.show, userController.showView);

router.get("/:id/edit", userController.edit);

router.put("/:id/update", userController.update, userController.redirectView);

module.exports = router;
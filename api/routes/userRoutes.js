const router = require("express").Router(),
    userController = require("../controllers/userController");
const axios = require("axios");

router.use("/", (req, res) => 
{
    console.log(`API request made to: ${req.url}`);
    axios
    .get(process.env.USER_SERVICE_ENDPOINT + `users${req.url}`)
    .then((response) => console.log("User Service Called From API User Route."))
    .catch((err) => console.log(err));
});

// router.get("/userList", userController.index, userController.indexView);
// //localhost:8080/userList
    
// router.get("/newuser", userController.new);
    
// router.post("/newuser", userController.validate, userController.create, userController.redirectView);
    
// router.get("/login", userController.login);
    
// router.post("/login", userController.authenticate);
    
// router.get("/logout", userController.logout, userController.redirectView);
    
// router.get("/:id", userController.show, userController.showView);
    
// router.get("/:id/edit", userController.edit);
    
// router.put("/:id/update", userController.update, userController.redirectView);
    
// router.delete("/:id/delete", userController.delete, userController.redirectView);

module.exports = router;
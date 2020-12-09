const router = require("express").Router(),
    userController = require("../controllers/userController");
const axios = require("axios");

router.use("/", (req, res) => 
{
    console.log(`Front-End request to API made to: ${req.url}`);
    axios
    .get(process.env.API_ENDPOINT + `users${req.url}`)
    .then((response) => console.log("API Called From Front-End User Route."))
    .catch((err) => console.log(err));
});
//localhost:8080/userList
    
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
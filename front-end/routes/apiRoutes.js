const router = require("express").Router();
const fetch = require("node-fetch");
//const userController = require("../controllers/userController");

router.get("/users", async (req, res) =>
{
    const fetchRes = await fetch("localhost:8081/users");
    const json = await fetchRes.json;
});
//router.use(userController.errorJSON);


module.exports = router;
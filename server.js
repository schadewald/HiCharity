const port = 8080;
let express = require("express");
let layouts = require("express-ejs-layouts");
let homeController = require("./controllers/homeController");
let userController = require("./controllers/userController");
const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.use(layouts);
app.use("/views", express.static("views"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => 
{
    console.log(`request made to: ${req.url}`)
    next();
});
app.use("/", router);

router.get("/", homeController.sendHomePage);
//localhost:8080/

router.post("/", homeController.displayRequest);

// router.post("/login", homeController.authenticateLoginInfo);

// router.get("/login", homeController.sendLogin);
// //localhost:8080/login

router.get("/useraccount", homeController.sendUserAccount);
//localhost:8080/useraccount

router.get("/donation", homeController.sendDonation);
//localhost:8080/donation

router.get("/home_page/:myName", homeController.repondWithHomePage);
//localhost:8080/home_page/whater-name-you-put

router.get("/name/:myName", homeController.respondWithName);
//localhost:8080/name/whater-name-you-put

router.get("/userList", userController.index, userController.indexView);
//localhost:8080/user

router.get("/login", userController.new);

router.post("/login", userController.create, userController.redirectView);

router.get("*", homeController.respondWithBadRequest);
//localhost:8080/anything-not-yet-defined

app.listen(port, () => 
{
    console.log("Server is now using express.");
});
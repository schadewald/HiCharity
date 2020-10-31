const port = 8080;
let express = require("express");
let layouts = require("express-ejs-layouts");
let homeController = require("./controllers/homeController");
let userController = require("./controllers/userController");
const app = express();
const router = express.Router();
const methodOverride = require("method-override");
const expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const passport = require("passport");
const User = require("./models/user");
router.use(cookieParser("secret_passcode"));
router.use(expressSession(
    {
        secret: "secret_passcode",
        cookie: 
        {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    }));
router.use(connectFlash());
router.use(methodOverride("_method", 
{
    methods: ["POST", "GET"]
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use((req, res, next) => 
{
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
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

router.use(expressValidator());

router.get("/", homeController.repondWithHomePage);
//localhost:8080/

router.post("/", homeController.displayRequest);

router.get("/name/:myName", homeController.respondWithName);
//localhost:8080/name/whater-name-you-put

router.get("/userList", userController.index, userController.indexView);
//localhost:8080/userList

router.get("/newuser", userController.new);

router.post("/newuser", userController.validate, userController.create, userController.redirectView);

router.get("/login", userController.login);

router.post("/login", userController.authenticate);

router.get("/logout", userController.logout, userController.redirectView);

router.get("/users/:id", userController.show, userController.showView);

router.get("/users/:id/edit", userController.edit);

router.put("/users/:id/update", userController.update, userController.redirectView);

router.delete("/users/:id/delete", userController.delete, userController.redirectView);

router.get("*", homeController.respondWithBadRequest);
//localhost:8080/anything-not-yet-defined

app.listen(port, () => 
{
    console.log('Express started on http://localhost:8080; press Ctrl-C to terminate.');
});
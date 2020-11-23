const port = 8080;
const axios = require("axios");
const homeController = require("./controllers/homeController");
let express = require("express");
let layouts = require("express-ejs-layouts");
const app = express();
const router = require("./routes/index");
const methodOverride = require("method-override");
const expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const passport = require("passport");
const User = require("./models/user");
app.use(cookieParser("secret_passcode"));
app.use(expressSession(
    {
        secret: "secret_passcode",
        cookie: 
        {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    }));
app.use(connectFlash());
app.use(methodOverride("_method", 
{
    methods: ["POST", "GET"]
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => 
{
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
app.set("view engine", "ejs");
app.set("token", process.env.TOKEN || "userT0k3n");
app.use(layouts);
app.use("/views", express.static("views"));
app.use("/public", express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => 
{
    console.log(`request made to: ${req.url}`)
    next();
});
app.use(expressValidator());
app.use("/", router);
// app.use("/users", (req, res) => 
// {
//     console.log(`request made to: ${req.url}`);
//     axios
//     .get(process.env.API_ENDPOINT + `users${req.url}`)
//     .then((response) => homeController.repondWithHomePage)
//     .catch((err) => console.log(err));
//     console.log("API Called From Front-End.");
// });
app.listen(port, () => 
{
    console.log('Front-End started on http://localhost:8080; press Ctrl-C to terminate.');
});
const port = 3000;
const axios = require("axios");
const donationController = require("./controllers/donationController");
const userController = require("./controllers/userController");
const express = require("express");
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
    console.log(`API received a request made to: ${req.url}`)
    next();
});
app.use(expressValidator());
app.use("/", router);

// app.get("/users", (req, res) => 
// {
//     axios
//         .get(process.env.USER_SERVICE_ENDPOINT, {params: {value: req.query.users}})
//         .then((response) => res.send(response.data))
//         .catch((err) => console.log(err));
// });
// app.get("/donations", (req, res) => 
// {
//     axios
//         .get(process.env.DONATION_SERVICE_ENDPOINT, {params: {value: req.query.donations}})
//         .then((response) => res.send(response.data))
//         .catch((err) => console.log(err));
// })

app.listen(port, () => 
{
    console.log('API Started.');
});
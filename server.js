const port = 8080;
// const MongoDB = require("mongodb").MongoClient,
//     dbURL = "mongodb://localhost:27017",
//     dbName = "group7_db";
let express = require("express");
let layouts = require("express-ejs-layouts");
let homeController = require("./controllers/homeController");
let userController = require("./controllers/userController");

//Testing MongoDB
// MongoDB.connect(dbURL, (error, client) => 
// {
//     if (error) throw error;
//     let db = client.db(dbName);
//     db.collection("userdonation")
//         .find()
//         .toArray((error, data) => 
//         {
//             if (error) throw error;
//             console.log(data);
//         });
// });
//Testing MongoDB
const app = express();

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

app.get("/", homeController.sendHomePage);
//localhost:8080/

app.post("/", homeController.displayRequest);

app.post("/login", homeController.authenticateLoginInfo);

app.get("/login", homeController.sendLogin);
//Somehow send MongoDB to homeController also.

//localhost:8080/login

app.get("/useraccount", homeController.sendUserAccount);
//localhost:8080/useraccount

app.get("/donation", homeController.sendDonation);
//localhost:8080/donation

app.get("/home_page/:myName", homeController.repondWithHomePage);
//localhost:8080/home_page/whater-name-you-put

app.get("/name/:myName", homeController.respondWithName);
//localhost:8080/name/whater-name-you-put
app.get("/user", userController.getAllDonations,
    (req, res, next) => 
    {
        console.log(req.data);
        res.render("user", {user: req.data});
    });
app.get("*", homeController.respondWithBadRequest);
//localhost:8080/anything-not-yet-defined
app.listen(port, () => 
{
    console.log("Server is now using express.");
});
const port = 8080;
express = require("express");
layouts = require("express-ejs-layouts");
homeController = require("./controllers/homeController");

const app = express();

app.set("view engine", "ejs");

app.use(layouts);
app.use("/views", express.static("views"));

app.use(
    express.urlencoded
    ({
        extended:false
    })
);
app.use(express.json());
app.use((req, res, next) => 
{
    console.log(`request made to: ${req.url}`)
    next();
});

app.get("/", homeController.sendHomePage);
//localhost:8080/

app.post("/", homeController.displayRequest);

app.get("/name/login", homeController.sendLogin);
//localhost:8080/login

app.get("/useraccount", homeController.sendUserAccount);
//localhost:8080/useraccount

app.get("/donation", homeController.sendDonation);
//localhost:8080/donation

app.get("/name/:myName", homeController.respondWithName);
//localhost:8080/name/whater-name-you-put

app.get("*", homeController.respondWithBadRequest);
//localhost:8080/anything-not-yet-defined

app.listen(port, () => 
{
    console.log("Server is now using express.");
});
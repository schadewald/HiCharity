const port = 8080;
express = require("express");
layouts = require("express-ejs-layouts");
homeController = require("./controllers/homeController");

const app = express();

app.set("view engine", "ejs");

app.use(layouts);

app.use
(
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

app.get("/", homeController.sendHello);

app.post("/", homeController.displayRequest);

app.get("/items/:vegetable", homeController.sendReqParam);

app.get("/name/:myName", homeController.respondWithName);

app.listen(port, () => 
{
    console.log("Server is now using express.");
});
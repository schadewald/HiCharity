const port = 8080;
let express = require("express");
let layouts = require("express-ejs-layouts");
let homeController = require("./controllers/homeController");
let userController = require("./controllers/userController");
const app = express();
const router = express.Router();
const methodOverride = require("method-override");

router.use(methodOverride("_method", 
{
    methods: ["POST", "GET"]
}));
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

router.get("/", homeController.repondWithHomePage);
//localhost:8080/

router.post("/", homeController.displayRequest);

router.get("/name/:myName", homeController.respondWithName);
//localhost:8080/name/whater-name-you-put

router.get("/userList", userController.index, userController.indexView);
//localhost:8080/userList

router.get("/newuser", userController.new);

router.post("/newuser", userController.create, userController.redirectView);

router.get("/login", userController.login);

router.post("/login", userController.create, userController.redirectView);

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
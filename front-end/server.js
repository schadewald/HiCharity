const port = 8080;
let express = require("express");
let layouts = require("express-ejs-layouts");
const app = express();
const router = require("./routes/index");
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



app.listen(port, () => 
{
    console.log("Server is now using express.");
});
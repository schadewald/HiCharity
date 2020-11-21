const port = 8080;
let express = require("express");
let layouts = require("express-ejs-layouts");
const app = express();
const router = require("../donation-service/routes/index");
app.set("view engine", "ejs");
app.use(express.json());
app.use((req, res, next) => 
{
    console.log(`request made to: ${req.url}`)
    next();
});

app.use("/", router);
app.listen(port, () => 
{
    console.log('Express started on http://localhost:8080; press Ctrl-C to terminate.');
});
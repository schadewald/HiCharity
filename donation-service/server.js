const port = 3000;
let express = require("express");
const app = express();
const router = require("./routes/index");
/*app.use((req, res, next) => 
{
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});*/
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => 
{
    console.log(`request made to: ${req.url}`);
    next();
});
app.use("/", router);
app.listen(port, () => 
{
    console.log('Express started on http://localhost:8080; press Ctrl-C to terminate.');
});
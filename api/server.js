const port = 8080;
let express = require("express");
const app = express();

let jsonDummy = {
    "name": "dummy",
    "id": -1
};

app.get("/users", (req, res) =>
{
    res.json(jsonDummy);
});


app.listen(port, () => 
{
    console.log("Server is now using express.");
});
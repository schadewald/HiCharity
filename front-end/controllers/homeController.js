const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://group7:group7@cluster0.28kdv.gcp.mongodb.net/test?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true}
);
const db = mongoose.connection;
db.once("open", () =>
{
    console.log("Successfully Connected to Database!")
});

module.exports = 
{
    displayRequest: (req, res) => 
    {  
    console.log(req.body);
    console.log(req.query);
    res.send("POST successful");
    },
    repondWithHomePage: (req, res) => 
    {
    res.render("home_page");
    },
    respondWithName: (req, res) => 
    {
    let paramsName = req.params.myName;
    res.render("home_page", {name: paramsName});
    },
    respondWithBadRequest: (req, res) => 
    {
    res.send("Error");
    }
};
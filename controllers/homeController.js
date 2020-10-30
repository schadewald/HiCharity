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
const User = require("../models/user");
//const Donation = require("../models/userDonation");

module.exports = 
{
    displayRequest: (req, res) => 
    {  
    console.log(req.body);
    console.log(req.query);
    res.send("POST successful");
    },
    sendLogin: (req, res) => 
    {
    res.render("loginPage", {name: ""});
    },
    sendUserAccount: (req, res) => 
    {
    res.send("User Account Page");
    },
    sendDonation: (req, res) => 
    {
    res.send("Donation Page");
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
    },
    authenticateLoginInfo: (req, res) =>
    {
    res.send(`Login attempt: <br> Username: ${req.body.username} <br> Password: ${req.body.password}`);
    }
};
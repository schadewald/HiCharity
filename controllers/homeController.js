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
    sendHomePage: (req, res) => 
    {
    res.send("Home Page");
    },
    displayRequest: (req, res) => 
    {  
    console.log(req.body);
    console.log(req.query);
    res.send("POST successful");
    },
    sendLogin: (req, res) => 
    {
    //let testParam = "TEST_PARAM";
    res.render("loginPage", {name: ""}); // empty string passed to name param in layout.ejs, preventing a header/footer from loading
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
    let paramsName = req.params.myName;
    res.render("home_page", {name: paramsName});
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
    //console.log(req.body);
    //console.log(req.query);

    //Testing DB Operations

    User.create(
        {
            name: 
            {
                first: req.body.username,
                last: "TestLastName"
            },
            // email: "testemail@gmail.com",
            userid: Math.floor(Math.random() * 1000000),
            password: req.body.password
        })
        .catch(error => console.log(error.message));

    // User.create(
    //     {
    //         username: req.body.username,
    //         password: req.body.password,
    //         userid: Math.floor(Math.random() * 10001)
    //     },
    //     function (error, savedDocument)
    //     {
    //         if (error) console.log(error);
    //         console.log("Successfully Entered New Data:");
    //         console.log(savedDocument);
    //     });

    //Testing DB Operations

    res.send(`Login attempt: <br> Username: ${req.body.username} <br> Password: ${req.body.password}`);
    }
};
//Testing DB Operations

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/group7_db",
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", () =>
{
    console.log("Successfully Connected to Database!")
});
const userDonationSchema = mongoose.Schema(
{
    username: String,
    userid: String,
    amount: Number
});
const Donation = mongoose.model("userdonation", userDonationSchema);

//Testing DB Operations

exports.sendHomePage = (req, res) => 
{
    res.send("Home Page");
};
exports.displayRequest = (req, res) => 
{
    console.log(req.body);
    console.log(req.query);
    res.send("POST successful");
};
exports.sendLogin = (req, res) => 
{
    //let testParam = "TEST_PARAM";
    res.render("loginPage", {name: ""}); // empty string passed to name param in layout.ejs, preventing a header/footer from loading
};
exports.sendUserAccount = (req, res) => 
{
    res.send("User Account Page");
};
exports.sendDonation = (req, res) => 
{
    res.send("Donation Page");
};
exports.repondWithHomePage = (req, res) => 
{
    let paramsName = req.params.myName;
    res.render("home_page", {name: paramsName});
};
exports.respondWithName = (req, res) => 
{
    let paramsName = req.params.myName;
    res.render("home_page", {name: paramsName});
};
exports.respondWithBadRequest = (req, res) => 
{
    res.send("Error");
};

exports.authenticateLoginInfo = (req, res) =>
{
    console.log(req.body);
    console.log(req.query);

    //Testing DB Operations
    
    Donation.create(
        {
            username: req.body.username,
            userid: req.body.password,
            amount: 69.00
        },
        function (error, savedDocument) 
        {
            if (error) console.log(error);
            console.log(savedDocument);
        });

    //Testing DB Operations

    res.send(`Login attempt: <br> Username: ${req.body.username} <br> Password: ${req.body.password}`);
};
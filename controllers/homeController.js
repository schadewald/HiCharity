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
// MongoDB.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
// MongoDB.connect(dbURL, (error, client) => 
// {
//     if (error) throw error;
//     let db = client.db(dbName);
//     db.collection("userdonation")
//         .find()
//         .toArray((error, data) => 
//         {
//             if (error) throw error;
//             console.log(data);
//         });
// });
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
    // MongoDB.connect(dbURL, (error, client) => 
    // {
    //     if (error) throw error;
    //     let db = client.db(dbName);
    //     db.collection("userdonation")
    //         .find()
    //         .toArray((error, data) => 
    //         {
    //             if (error) throw error;
    //             console.log(data);
    //         });
    //     db.collection("userdonation").insert({username: req.body.username, userid: req.body.password, amount: "69.00"},
    //         (error, db) => 
    //         {
    //             if (error) throw error;
    //             console.log(db);
    //         });
    // });

    //Testing DB Operations

    res.send(`Login attempt: <br> Username: ${req.body.username} <br> Password: ${req.body.password}`);
};
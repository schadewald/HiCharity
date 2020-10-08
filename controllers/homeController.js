//Testing DB Operations

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://group7:group7@cluster0.28kdv.gcp.mongodb.net/test";
const client = new MongoClient(url);
const dbName = "test";
async function run() 
{
    try 
    {
        await client.connect();
        console.log("Connected Correctly to Server");
        const db = client.db(dbName);

        const col = db.collection("people");
        let personDocument = 
        {
            "name": { "first": "Alan", "last": "Turing"},
            "birth": new Date(1912, 5, 23),
            "death": new Date(1954, 5, 7),
            "contribs": ["Turing Maching", "Turing Test", "Turingery"],
            "views": 1250000
        }
        const p = await col.insertOne(personDocument);
        const myDoc = await col.findOne();
        console.log(myDoc);
    }
    catch (err) 
    {
        console.log(err.stack);
    }
    finally 
    {
        await client.close();
    }
}
run().catch(console.dir);

// const mongoose = require("mongoose");
// mongoose.connect(
//     "mongodb://localhost:27017/group7_db",
//     {useNewUrlParser: true, useUnifiedTopology: true}
// );
// const db = mongoose.connection;
// db.once("open", () =>
// {
//     console.log("Successfully Connected to Database!")
// });
// const Donation = require("../models/userDonation");

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
    
    // Donation.create(
    //     {
    //         username: req.body.username,
    //         userid: req.body.password,
    //         amount: 69.00
    //     },
    //     function (error, savedDocument) 
    //     {
    //         if (error) console.log(error);
    //         console.log(savedDocument);
    //     });

    //Testing DB Operations

    res.send(`Login attempt: <br> Username: ${req.body.username} <br> Password: ${req.body.password}`);
};
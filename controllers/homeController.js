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
    res.send("Login Page");
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
    res.render("home_screen", {name: paramsName});
};
exports.respondWithName = (req, res) => 
{
    let paramsName = req.params.myName;
    res.render("home_screen", {name: paramsName});
};
exports.respondWithBadRequest = (req, res) => 
{
    res.send("Error");
};
exports.sendReqParam = (req, res) =>
{
    res.send(req.params.vegetable);
};
exports.sendHello = (req, res) => 
{
    res.send("Hello, Universe!");
};
exports.displayRequest = (req, res) => 
{
    console.log(req.body);
    console.log(req.query);
    res.send("POST successful");
};

exports.respondWithName = (req, res) => 
{
    let paramsName = req.params.myName;
    res.render("index", {name: paramsName});
}
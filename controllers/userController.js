const User = require("../models/user");
const NewUser = require("../models/newUser");

exports.getAllUsers = (req, res, next) => 
{
    NewUser.find( {}, (error, users) => 
    {
        if (error) next(error);
        req.data = users;
        next();
    });
};
// const { create } = require("../models/user");
const User = require("../models/user");

module.exports = 
{
    new: (req, res) => 
    { 
    res.render("users/new_user");
    },
    create: (req, res, next) => 
    {
        let userParams = 
        {
            name: 
            {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            userid: req.body.userid,
            password: req.body.password
        };
        User.create(userParams)
            .then(user => 
                {
                    res.locals.redirect = "/user";
                    res.locals.user = user;
                    next();
                })
            .catch(error => 
                {
                    console.log(`Error saving user: ${error.message}`);
                    next(error);
                });
    },
    redirectView: (req, res, next) => 
    {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    index: (req, res, next) => 
    {
        User.find()
            .then(users => 
            {
                res.locals.users = users;
                next();
            })
            .catch(error => 
            {
                console.log(`Error fetching users: ${error.message}`)
                next(error);
            });
    },
    indexView: (req, res) => 
    {
        res.render("users/index");
    }
};
// const { create } = require("../models/user");
const User = require("../models/user");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

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
            userid: Math.floor(Math.random() * 1000000),
            password: req.body.password
        };
        User.create(userParams)
            .then(user => 
                {
                    res.locals.redirect = "/userList";
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
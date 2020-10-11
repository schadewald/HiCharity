const httpStatus = require("http-status-codes");
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
                    res.locals.redirect = "/user/userList";
                    res.locals.user = user;
                    next();
                })
            .catch(error => 
                {
                    console.log(`Error saving user: ${error.message}`);
                    next(error);
                });
    },
    edit: (req, res, next) => 
    {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => 
                {
                    res.render("users/edit", 
                    {
                        user: user
                    });
                })
            .catch(error => 
                {
                    console.log(`Error fetching user by ID: ${error.message}`);
                    next(error);
                });
    },
    update: (req, res, next) => 
    {
        let userId = req.params.id,
            userParams = 
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
        User.findByIdAndUpdate(userId, 
            {
                $set: userParams
            })
            .then(user => 
                {
                    res.locals.redirect = `/users/${userId}`;
                    res.locals.user = user;
                    next();
                })
            .catch(error => 
                {
                    console.log(`Error updating user by ID: ${error.message}`);
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
    },
    show: (req, res, next) => 
    {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => 
                {
                    res.locals.user = user;
                    next();
                })
            .catch(error => 
                {
                    console.log(`Error fetching user by ID: ${erro.message}`);
                    next();
                });
    },
    showView: (req, res) => 
    {
        res.render("users/show");
    },
    respondJSON: (req, res) =>
    {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) =>
    {
        let errorObject;

        if (error)
        {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        }
        else
        {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown error!"
            };
        }
    }
};
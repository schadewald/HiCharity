const User = require("../models/user"),
    getUserParams = (body) => 
    {
        return {
            name: 
            {
                first: body.first,
                last: body.last
            },
            email: body.email,
            userid: body.userid,
            password: body.password
        };
    };
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

module.exports = 
{
    new: (req, res) => 
    { 
    res.render("users/new_user");
    },
    login: (req, res) => 
    {
    res.render("users/login_user");
    },
    authenticate: (req, res, next) => 
    {
        User.findOne(
        {
            email: req.body.email
        })
        .then(user => 
        {
            if (user && user.password === req.body.password) 
            {
                res.locals.redirect = `/users/${user._id}`;
                req.flash("success", `${user.fullName}'s logged in successfully!`);
                res.locals.user = user;
                next();
            }
            else 
            {
                req.flash("error", "Your account or password is incorrect. Please try again!");
                res.locals.redirect = "/login";
                next();
            }
        })
        .catch(error => 
            {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });
    },
    create: (req, res, next) => 
    {
        let userParams = getUserParams(req.body);
        userParams.userid = Math.floor(Math.random() * 1000000);        
        User.create(userParams)
            .then(user => 
                {
                    req.flash("success", `${user.fullName}'s account created successfully!`);
                    res.locals.redirect = "/userList";
                    res.locals.user = user;
                    next();
                })
            .catch(error => 
                {
                    console.log(`Error saving user: ${error.message}`);
                    res.locals.redirect = "/newuser";
                    req.flash("error", `Email already exitst! Please enter a different email.`);
                    next();
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
    delete: (req, res, next) => 
    {
        let userId = req.params.id;
        User.findByIdAndRemove(userId).then(() => 
            {
                res.locals.redirect = "/userList";
                next();
            })
            .catch(error => 
                {
                    console.log(`Error deleting user by ID: ${error.message}`);
                    next();
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
        res.render("users/index", 
        {
            flashMessages: 
            {
                success: "Loaded all users!"  //This is just to remind me how to send flashMessages to index.
            }
        });
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
                    console.log(`Error fetching user by ID: ${error.message}`);
                    next();
                });
    },
    showView: (req, res) => 
    {
        res.render("users/show");
    }
};
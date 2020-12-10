const passport = require("passport");
const token = process.env.TOKEN || "recipeT0k3n"
const jsonWebToken = require("jsonwebtoken");
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
    apiAuthenticate: (req, res, next) => 
    {
        passport.authenticate("local", (errors, user) => 
        {
            if (user) 
            {
                let signedToken = jsonWebToken.sign(
                    {
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    "secret_encoding_passphrase");
                res.json(
                    {
                        success: true,
                        token: signedToken
                    });
            }
            else 
            {
                res.json(
                    {
                        success: fail,
                        message: "Could not authenticate user."
                    });
            }
        })(req, res, next);
    },
    verifyToken: (req, res, next) => 
    {
        let token = req.query.apiToken;
        if (token) 
        {
            User.findOne({ apiToken: token }).then(user => 
                {
                    if (user) next();
                    else next(new Error("invalid API Token."));
                })
                .catch(error => 
                    {
                        next(new Error(error.message));
                    });
        }
        else 
        {
            next(new Error("Invalid API Token."));
        }
    },
    new: (req, res) => 
    { 
        res.render("users/new_user");
    },
    login: (req, res) => 
    {
        res.render("users/login_user");
    },
    authenticate: passport.authenticate("local", 
    {
        failureRedirect: "/users/login",
        failureFlash: "failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    validate: (req, res, next) => 
    {
        req.sanitizeBody("email").normalizeEmail(
        {
            all_lowercase: true
        }).trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then((error) => 
        {
            if (!error.isEmpty()) 
            {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = "/users/newuser";
                next();
            }
            else 
            {
                next();
            }
        });
    },
    create: (req, res, next) => 
    {
        if (req.skip) next();
        let newUser = new User( getUserParams(req.body) );
        newUser.userid = Math.floor(Math.random() * 1000000);        
        User.register(newUser, req.body.password, (error, user) => 
        {
            if (user) 
            {
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.redirect = "/users/userList";
                next();
            }
            else 
            {
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.locals.redirect = "/users/newuser";
                next();
            }
        });
    },
    edit: (req, res, next) => 
    {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => 
                {
                    res.render("../views/users/edit", 
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
    logout: (req, res, next) => 
    {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },
    delete: (req, res, next) => 
    {
        let userId = req.params.id;
        User.findByIdAndRemove(userId).then(() => 
            {
                res.locals.redirect = "/users/userList";
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
        if (req.query.format === "json") 
        {
            res.json(res.locals.users);
        }
        else 
        {
            res.render("../views/users/index");
        }
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
        res.render("../views/users/show");
    }
};
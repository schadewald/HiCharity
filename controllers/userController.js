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
            if (user) 
            {
                user.passwordComparison(req.body.password)
                    .then(passwordsMatch => 
                    {
                        if (passwordsMatch) 
                        {
                            res.locals.redirect = `/users/${user._id}`;
                            req.flash("success", `${user.fullName}'s logged in successfully!`);
                            res.locals.user = user;
                        }
                        else 
                        {
                            req.flash("error", "Failed to log in user account: Incorrect Password.");
                            res.locals.redirect = "/login";
                        }
                        next();
                    });
            }
            else 
            {
                req.flash("error", "Failed to log in user account: User account not found.");
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
                res.locals.redirect = "/newuser";
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
                res.locals.redirect = "/userList";
                next();
            }
            else 
            {
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.locals.redirect = "/newuser";
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
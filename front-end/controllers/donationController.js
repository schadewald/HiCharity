const passport = require("passport");
const getUserParams = (body) => 
    {
        return {
            userid: body.userid,
            username: body.username,
            amount: body.amount
        };
    };
const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const axios = require("axios");
mongoose.set("useCreateIndex", true);

module.exports = 
{
    new: (req, res) => 
    {
        res.render("donations/donate");
    },
    validate: (req, res, next) => 
    {
        req.sanitizeBody("username").normalizeEmail(
            {
                all_lowercase: true
            }).trim();
        req.check("username", "Username is invalid").isEmail();
        req.check("amount", "Amount cannot be empty").notEmpty();
        req.getValidationResult().then((error) => 
        {
            if (!error.isEmpty()) 
            {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = "/donations/donate";
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
        let donationParams = 
        {
            userid: Math.floor(Math.random() * 1000000),
            username: req.body.username,
            amount: req.body.amount
        };
    },
    redirectView: (req, res, next) => 
    {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    index: (req, res, next) => 
    {
        axios
            .get(process.env.DONATION_ENDPOINT + "dummy")
            .then((response) => 
            {
                res.locals.donations = response.body.dummy;
                next();
            })
            .catch((error) => 
            {
                console.log(error.message)
                next(error);
            });
    },
    indexView: (req, res) => 
    {
        if (req.query.format === "json") 
        {
            res.json(res.locals.donations);
        }
        else 
        {
            res.render("donations/index");
        }
    },
    respondJSON: (req, res) => 
    {
        res.json(
            {
                status: httpStatus.OK,
                data: res.locals
            });
    },
    errorJSON: (error, req, res, next) => 
    {
        let errorObject;
        if (error) 
        {
            errorObject = 
            {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        }
        else 
        {
            errorObject = 
            {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unkown Error."
            };
        }
        res.json(errorObject);
    }
};
const passport = require("passport");
const Donation = require("../models/donation"),
    getUserParams = (body) => 
    {
        return {
            userid: body.userid,
            username: body.username,
            amount: body.amount
        };
    };
const mongoose = require("mongoose");
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
        Donation.create(donationParams).then(donation => 
            {
                res.locals.redirect = "/donations/donationList";
                res.locals.donation = donation;
                next();
            })
            .catch(error => 
            {
                console.log(`Error saving donation: ${error.message}`);
                next(error);
            });

        // if (req.skip) next();
        // let newDonation = new Donation( getUserParams(req.body) );
        // newDonation.userid = 8888;       
        // Donation.register(newDonation, req.body.username, (error, donation) => 
        // {
        //     if (donation) 
        //     {
        //         req.flash("success", `${donation.amount} donated successfully!`);
        //         res.locals.redirect = "/";
        //         next();
        //     }
        //     else 
        //     {
        //         req.flash("error", `Failed to create donation because: ${error.message}.`);
        //         res.locals.redirect = "/donations/donate";
        //         next();
        //     }
        // });
    },
    redirectView: (req, res, next) => 
    {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    index: (req, res, next) => 
    {
        Donation.find()
            .then(donations => 
            {
                res.locals.donations = donations;
                next();
            })
            .catch(error => 
            {
                console.log(`Error fetching donations: ${error.message}`)
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
    }
};
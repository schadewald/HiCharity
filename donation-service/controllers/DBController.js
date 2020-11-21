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
const httpStatus = require("http-status-codes");
mongoose.set("useCreateIndex", true);

module.exports = 
{
    create: (req, res, next) =>
    {
        Donation.create(req.body.donationParams).then(donation => 
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
    },
    getDummy: (req, res, next) =>
    {
        let jsonDummy = {
            "name": "dummy",
            "id": -1
        }
        res.body.dummy = jsonDummy;
        next();
    }
};
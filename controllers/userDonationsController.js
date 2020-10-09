const Donation = require("../models/userDonation");

exports.getAllDonations = (req, res, next) => 
{
    Donation.find( {}, (error, donations) => 
    {
        if (error) next(error);
        req.data = donations;
        next();
    });
};
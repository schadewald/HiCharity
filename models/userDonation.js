const mongoose = require("mongoose"),
    userDonationSchema = mongoose.Schema(
    {
        username: String,
        userid: String,
        amount: Number
    });
module.exports = mongoose.model("userdonation", userDonationSchema);
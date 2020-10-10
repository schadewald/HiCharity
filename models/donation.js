const mongoose = require("mongoose"),
    donationSchema = mongoose.Schema(
    {
        username: String,
        userid: String,
        amount: Number
    });
module.exports = mongoose.model("donation", donationSchema);
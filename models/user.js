const mongoose = require("mongoose"),
    userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        userid: Number
    });
module.exports = mongoose.model("user", userSchema);
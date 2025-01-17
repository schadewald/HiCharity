const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose"),
    {Schema} = mongoose,
    donationSchema = new Schema(
    {
        username: 
        {
            type: String,
            required: true,
            lowercase: true,
        },
        userid: 
        {
            type: Number,
            min: [0, "Error - Negative Number ID"],
            max: 999999,
            required: true
        },
        amount: 
        {
            type: Number,
            required: true
        },
        donations: [{type: Schema.Types.ObjectId, ref: "donation"}],
        users: [{type: Schema.Types.ObjectId, ref: "user"}]
    },
    {
        timestamps: true
    });
donationSchema.plugin(passportLocalMongoose, 
{
    usernameField: "username",
    amountField: "amount"
});
module.exports = mongoose.model("donation", donationSchema);
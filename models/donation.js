const mongoose = require("mongoose"),
    {Schema} = mongoose,
    donationSchema = new Schema(
    {
        username: 
        {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        userid: 
        {
            type: Number,
            min: [0, "Error - Negative Number ID"],
            max: 999999
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
module.exports = mongoose.model("donation", donationSchema);
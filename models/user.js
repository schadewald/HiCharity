const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose"),
    {Schema} = mongoose,
    userSchema = new Schema(
        {
            name: 
            {
                first: 
                {
                    type: String,
                    trim: true
                },
                last: 
                {
                    type: String,
                    trim: true
                }
            },
            email: 
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
            password: 
            {
                type: String,
                required: true
            },
            users: [{type: Schema.Types.ObjectId, ref: "user"}],
            donations: [{type: Schema.Types.ObjectId, ref: "donation"}]
        },
        {
            timestamps: true
        });
userSchema.virtual("fullName").get(function() 
{
    return `${this.name.first} ${this.name.last}`;
});
userSchema.pre("save", function(next) 
{
    let user = this;
    bcrypt.hash(user.password, 10).then(hash => 
    {
        user.password = hash;
        next();
    })
    .catch(error => 
    {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    });
});
userSchema.methods.passwordComparison = function(inputPassword) 
{
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};
userSchema.plugin(passportLocalMongoose, 
{
    usernameField: "email"
});
module.exports = mongoose.model("user", userSchema);
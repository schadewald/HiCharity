const mongoose = require("mongoose"),
    {Schema} = mongoose,
    newUserSchema = new Schema(
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
            // email: 
            // {
            //     type: String,
            //     required: true,
            //     lowercase: true,
            //     unique: true
            // },
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
newUserSchema.virtual("fullName").get(function() 
{
    return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("newUser", newUserSchema);
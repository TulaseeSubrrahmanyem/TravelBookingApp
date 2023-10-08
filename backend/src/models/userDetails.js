const mongoose = require('mongoose');

let RegisterUser = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            // Require password if it exists (e.g., for registration)
           // return this.password || this.confirmpassword;
           return this.password || (this.select_by !== 'google' && this.confirmpassword);
        },
    },
    // confirmpassword: {
    //     type: String,
    //     required: function () {
    //         // Require confirmpassword only during registration
    //         return (
    //             (this.isNew && (!this.password || !this.confirmpassword)) ||
    //             (this.select_by === 'google' && !this.confirmpassword)
    //         );
    //     },
    // },
    confirmpassword: {
        type: String,
        required: function () {
            // Require confirmpassword only during registration
           // return this.isNew && (!this.password || !this.confirmpassword);
            // Require confirmpassword only when not registering via Google
            return this.select_by !== 'google' && (!this.password || !this.confirmpassword);
        },
    },
    select_by: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    state: { type: String },
});



module.exports = mongoose.model("RegisterUser", RegisterUser);

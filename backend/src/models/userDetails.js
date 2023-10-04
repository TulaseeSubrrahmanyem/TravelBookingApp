const mongoose = require('mongoose');

let RegisterUser = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            // Require password if it exists (e.g., for registration)
            return this.password || this.confirmpassword;
        },
    },
    confirmpassword: {
        type: String,
        required: function () {
            // Require password if it exists (e.g., for registration)
            return this.password || this.confirmpassword;
        },
    },
    phoneNumber: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    state: { type: String },
});

module.exports = mongoose.model("RegisterUser", RegisterUser);

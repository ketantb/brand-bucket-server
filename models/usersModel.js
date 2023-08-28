const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    otp: { type: String },
    password: { type: String },
    userType: { type: String },
    isVerified: { type: Boolean, default: false },
})

const User = mongoose.model("User", userSchema);
module.exports = User;
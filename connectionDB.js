const mongoose = require('mongoose');
require('dotenv').config();
const key = process.env.mongoKey;

mongoose.set('strictQuery', true)
mongoose.connect(key)
    .then(() => {
        console.log("Database Connected !!");
    })
    .catch((err) => {
        console.log("Database Connection error !!", { error: err });
    })
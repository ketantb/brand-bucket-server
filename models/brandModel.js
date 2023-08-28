const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    names: [],
    aboutName: { type: String },
    img: { type: String },
    possibleUses: [],
    // styleType: [],
    // industryType: [],
    keywords: [],
    domain: { type: String },
    price: { type: Number },
    sold: { type: Boolean, default: false },
    sellerId: mongoose.Schema.Types.ObjectId,
})

const Brand = mongoose.model("brand", brandSchema);
module.exports = Brand;
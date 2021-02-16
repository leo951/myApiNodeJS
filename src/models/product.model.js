const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    price: {
        type: Number,
        require: true,
        lowercase: true
    },
    title: {
        type: String,
        require: true,
        lowercase: true
    },
    description: {
        type: String,
        require: false,
    },
    img: {
        type: String,
        require: true,
    }
})
module.exports = mongoose.model('Product', productSchema);
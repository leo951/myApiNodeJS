const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        require: true,
        lowercase: true
    },
    description: {
        type: String,
        require: false,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
        lowercase: true
    }
})
module.exports = mongoose.model('Product', productSchema);
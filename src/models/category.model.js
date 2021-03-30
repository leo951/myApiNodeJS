const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        require: true,
        lowercase: true
    },
    products:[{ 
        type: Schema.Types.ObjectId, ref: 'Product'
    }]
});
module.exports = mongoose.model('Category', CategorySchema);
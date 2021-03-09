const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastname: {
        type: String,
        require: true,
        lowercase: true
    },
    firstname: {
        type: String,
        require: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlenght: 4,
        unique: true
    },
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
})
module.exports = mongoose.model('User', userSchema);
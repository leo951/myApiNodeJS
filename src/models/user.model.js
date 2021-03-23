const { boolean } = require('joi');
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
	phone: {
		type: Number
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
	isAdmin: {
		type: Boolean
	},
	adress: {
		fullAddress: {
			type: String
		},
		postalCode: {
			type: Number
		},
		city: {
			type: String
		},
		country: {
			type: String
		}
	},

	orders: [ { type: Schema.Types.ObjectId, ref: 'Order' } ]
});
module.exports = mongoose.model('User', userSchema);

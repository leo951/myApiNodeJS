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
			type: String,
			require: true
		},
		postalCode: {
			type: Number,
			require: true
		},
		city: {
			type: String,
			require: true
		},
		country: {
			type: String,
			require: true
		}
	},

	orders: [ { type: Schema.Types.ObjectId, ref: 'Order' } ]
});
module.exports = mongoose.model('User', userSchema);

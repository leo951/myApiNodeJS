const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema([{
	total: {
		type: Number,
		require: true
	},
	status: {
		type: String,
		require: true
	},
	date:{
		type: String,
		require: true
	},
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ]
}]);
module.exports = mongoose.model('Order', orderSchema);

//Liste de order []

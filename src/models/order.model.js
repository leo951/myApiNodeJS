const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	total: {
		type: Number
	},
	status: {
		type: String
	},
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ]
});
module.exports = mongoose.model('Order', orderSchema);

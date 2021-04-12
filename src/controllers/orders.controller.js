const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

exports.create = (req, res) => {
	const order = new Order({
		total: req.body.total,
		status: req.body.status,
		date: req.body.date,
		user: req.body.user,
		products: req.body.products
	});

	order
		.save()
		.then((data) => {
			User.findByIdAndUpdate(req.body.user, { $push: {orders:data._id } }).then(() => {
				res
					.send({
						data: data
					})
					.catch((err) => res.send(err));
			});
			res.send({
				order: data,
				created: true
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({
				error: 500,
				message: err.message || 'Vous avez une erreur'
			});
		});
};

exports.getOrder = (req, res) => {
	Order.findById(req.params.id)
		.populate('user')
		.populate('products')
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Votre Order id ${req.params.id} n'a pas été trouvé`
				});
			}
			res.send(data);
		})
		.catch((err) => res.send(err));
};

exports.getOrders = (req, res) => {
	Order.find()
		.populate('user')
		.populate('products')
		.then((orders) => {
			res.status(200).json(orders);
		})
		.catch((err) => {
			res.status(400).json({
				error: 500,
				message: err.message || 'Vous avez une erreur'
			});
		});
};

exports.modifyOrder = (req, res, next) => {
    const order = new Order({
		_id: req.params.id,
     	status: req.body.status
    });
    Order.updateOne({_id: req.params.id}, order)
    .then(
      (data) => {
        res.status(201).json({
          message: 'Status updated successfully!',
          order: data
        });
      }
    )
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

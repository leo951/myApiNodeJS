const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

//req = requete, res = response
//Creation de user
exports.create = (req, res) => {
	let hasedPassword = bcrypt.hashSync(req.body.password, 10);

	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: hasedPassword
	});

	user
		.save() //post pour article myMondel.find
		.then((data) => {
			let userToken = jwt.sign(
				{
					id: data._id,
					auth: true
				},
				'supersecret',
				{
					expiresIn: 86400
				}
			);
			res.send({
				token: userToken,
				auth: true
				// user: data,
				// created: true
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
exports.login = (req, res) => {
	User.findOne({
		email: req.body.email
	})
		.populate('orders')
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					auth: false,
					token: null,
					message: `Pas de email ${req.body.email}`
				});
			}
			let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);

			if (!passwordIsValid) {
				return res.status(401).send({
					auth: false,
					token: null,
					message: 'passwrd in not valid'
				});
			}
			let userToken = jwt.sign({ id: data._id }, 'supersecret', { expiresIn: 86400 });
			res.send({
				auth: true,
				token: userToken
			});
		})
		.catch((err) => res.send(err));
};

exports.findOne = (req, res) => {
	User.findById(req.params.id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Votre User id ${req.params.id} n'a pas été trouvé`
				});
			}
			res.send(data);
		})
		.catch((err) => res.send(err));
};

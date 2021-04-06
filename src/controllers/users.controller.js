const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { boolean } = require('joi');

//req = requete, res = response
//Creation de user
exports.create = (req, res) => {
	let hasedPassword = bcrypt.hashSync(req.body.password, 10);

	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		phone: req.body.phone,
		email: req.body.email,
		adress: {
			fullAddress: req.body.adress.fullAddress,
			postalCode: req.body.adress.postalCode,
			city: req.body.adress.city,
			country: req.body.adress.country
		},
		password: hasedPassword,
		isAdmin:  false
	});

	user
		.save() //post pour article myMondel.find
		.then((data) => {
			let userToken = jwt.sign(
				{
					id: data._id,
					isAdmin: data.isAdmin,
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
	.populate('orders')
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Votre User id ${req.params.id} n'a pas été trouvé`
				});
			}
			return res.send(data);
		})
		.catch((err) => res.send(err));
};

																// Partie Admin
exports.loginAdmin = (req, res) => {
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
			let userAdminToken = jwt.sign({ id: data._id }
				, 'supersecret', { expiresIn: 86400 });
			res.send({
				auth: true,
				token: userAdminToken
			});
		})
	.catch((err) => res.send(err));
};

exports.createAdmin = (req, res) => {
	let hasedPassword = bcrypt.hashSync(req.body.password, 10);

	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		phone: req.body.phone,
		email: req.body.email,
		adress: {
			fullAddress: req.body.adress.fullAddress,
			postalCode: req.body.adress.postalCode,
			city: req.body.adress.city,
			country: req.body.adress.country
		},
		password: hasedPassword,
		isAdmin: true 
	});

	user
		.save() //post pour article myMondel.find
		.then((data) => {
			let userAdminToken = jwt.sign(
				{
					id: data._id,
					isAdmin: data.isAdmin,
					auth: true
				},
				'supersecret',
				{
					expiresIn: 86400
				}
			);
			res.send({
				token: userAdminToken,
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

exports.modifyUser = (req, res, next) => {
    const user = new User({
      _id: req.params.id,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      phone: req.body.phone,
      email: req.body.email,
	  adress: {
		fullAddress: req.body.fullAddress,
		postalCode: req.body.postalCode,
		city: req.body.city,
		country: req.body.country
	},
      password: req.body.password,
      isAdmin: req.body.IsAdmin,
    });
    User.updateOne({_id: req.params.id}, user)
	.then(
      () => {
        res.status(201).json({
          message: 'User updated successfully!'
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

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: ' User deleted successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

const Order = require('../models/order.model');
const mongoose = require('mongoose');


exports.create = (req, res) => {
    const order = new Order({
        total: req.body.total,
        user: req.body.user,
        products: req.body.products,
      });

      order.save()
      .then((data) => {
          res.send({
            order: data,
            created: true
          });
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send({
              error: 500,
              message: err.message || "Vous avez une erreur"
          })
      })
}

exports.getOrder = (req, res) => {
    Order.findById(req.params.id)
    .populate('user')
    .populate('produits')
    .then((data) => {
        if (!data) {
            res.status(404).send({
                message:`Votre Order id ${req.params.id} n'a pas été trouvé`
            })
        }
        res.send(data)
    })
    .catch((err) => res.send(err));
}

exports.getOrders = (req, res) => {
    Order.find()
    .populate('user')
    .populate('produits')
    .then(
        (orders) => {
        res.status(200).json(orders);
    })
    .catch((err) => {
        res.status(400).json({
            error: 500,
            message: err.message || "Vous avez une erreur"
        })
    })
}
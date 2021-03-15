
const Product = require('../models/product.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { boolean } = require('joi');

exports.create = (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    });

    product.save()
    .then((data) => {
        res.send({
            product: data,
            created: true
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating product"
        })
    })

}


exports.getAllProduct = (req, res) => {
    Product.find()
    .then(
      (Products) => {
        res.status(200).json(Products);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};


exports.getProduct = (req, res) => {
  Product.findOne({
    _id: req.params.id
  }).then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.modifyProduct = (req, res, next) => {
    const product = new Product({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price
        });
    Product.updateOne({_id: req.params.id}, product)
    .then(
      (data) => {
        res.status(201).json({
          message: 'Product updated successfully!',
          product: data
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

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Product deleted successfully !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
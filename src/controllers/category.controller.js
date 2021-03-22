
const Category = require('../models/category.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { boolean } = require('joi');

exports.create = (req, res) => {
    const category = new Category({
        title: req.body.title
    });
    category.save()
    .then((data) => {
        res.send({
            category: data,
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
exports.getCategoryProduct = (req, res) => {
    Category.find({
      _id: req.params.id
    })
    .then(
      (category) => {
        res.status(200).json(category);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getAllCategory = (req, res) => {
    Category.find()
    .then(
      (category) => {
        res.status(200).json(category);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};
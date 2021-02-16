const Product = require('../models/product.model')

exports.create = (req, res) => {
    const product = new Product({
        price: req.body.price,
        title: req.body.title,
        description: req.body.description,
        img: req.body.img
    })

    product.save()

    .then((data) => {
        res.send({
            product: data,
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

exports.getAllProduct = (req, res) => {
        Product.find()
        .then(
            (products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(400).json({
                error: 500,
                message: err.message || "Vous avez une erreur"
            })
        })
}

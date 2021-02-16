const User = require('../models/user.model');

//req = requete, res = response
//Creation de user
exports.create = (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.email
    });

    user.save() //post pour article myMondel.find
    .then((data) => {
        res.send({
            user: data,
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
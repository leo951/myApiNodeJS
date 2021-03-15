const jwt = require('jsonwebtoken');

function verifyAdminToken(req, res, next) {
    let tokenAdmin = req.headers.authorization;
    console.log(tokenAdmin);
    if (!tokenAdmin) {
        return res.status(401).send({
            auth: false,
            tokenAdmin: null,
            message:"missing tokenAdmin, please login"
        })
    }
    jwt.verify(tokenAdmin, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                auth: false,
                tokenAdmin: null,
                message:"no authorized"
            })
        }
        console.log(decoded);
        if (!decoded.isAdmin) {
            return res.status(401).send({
                auth: false,
                tokenAdmin: null,
                message:"no authorized"
            })
        }
        next();
    })
}

module.exports = verifyAdminToken;
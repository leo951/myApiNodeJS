const mongoose = require('mongoose');
const config = require('../configs/db.config');

exports.connectDb = ( ) => {
    let url = config.mongo.uri;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('connection reussi à mongodb'))
    .catch((err) => console.log('connection echoué', err));
};

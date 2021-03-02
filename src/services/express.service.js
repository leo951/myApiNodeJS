require('dotenv').config()
const express =  require('express');
const app =  express();
const apiRouter = require('../routes')
const bodyParser = require('body-parser')

exports.start = ( ) => {

    const port = process.env.PORT;

    app.use(bodyParser.json());
    app.use('/api/v1', apiRouter);

    app.listen(port, (err) => {
        if (err) {
            console.log(`erreur : ${err}`);
            process.exit();
        }
        console.log(`Exemple d'application écoutant sur : http://localhost: ${port}`);
    })
}






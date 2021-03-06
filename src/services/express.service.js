require('dotenv').config()
import express from 'express'
const app =  express();
const apiRouter = require('../routes')
const bodyParser = require('body-parser')
const cors = require('cors')

exports.start = ( ) => {

    const port = process.env.PORT;

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api/v1', apiRouter);

    app.listen(port, (err) => {
        if (err) {
            console.log(`erreur : ${err}`);
            process.exit();
        }
        console.log(`Exemple d'application écoutant sur : http://localhost: ${port}`);
    })
}






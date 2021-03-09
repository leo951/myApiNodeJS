// Créer un dossier mockup -> users.json(avec 3 users)
// Email, firstname, Lastname
// Créer route users accessible en get
// Afficher les json en localhost

    // const users = require('./src/mockup/users.json');
    // app.get('/users', (req,res) => {
    //   res.send(users);
    // });
// Possibilité de faire get/post/put/delete (app.post, app.put, etc)

//faire redirection express.service lance le serveur
const app = require('./services/express.service');
const mongoose = require('./services/mongoose.service')


mongoose.connectDb();
app.start();
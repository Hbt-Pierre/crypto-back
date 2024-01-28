import express from 'express';

const app = express();
const bodyParser = require('body-parser');
const config = require("./config");
const storageUtils = require("./utils/storage.utils");


//Import des routes
const vaultRoute = require("./routes/vault.route");
app.use(bodyParser.json());


//Déclaration des routes
app.use("/vault",vaultRoute);


//Lancement du serveur Web et vérification

storageUtils.checkFileStorage();
app.listen(config.HTTP_PORT, () => {
    console.log(`Server is running at http://localhost:${config.HTTP_PORT}`);
});

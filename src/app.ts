import express from 'express';
import fileUpload from "express-fileupload";

const app = express();
const bodyParser = require('body-parser');
const config = require("./config");
const storageUtils = require("./utils/storage.utils");


//Import des routes
const vaultRoute = require("./routes/vault.route");
const passwordRoute = require("./routes/password.route");
app.use(bodyParser.json());
app.use(fileUpload());

//Déclaration des routes
app.use("/vault",vaultRoute);
app.use("/password",passwordRoute);


//Lancement du serveur Web et vérification

storageUtils.checkFileStorage();
app.listen(config.HTTP_PORT, () => {
    console.log(`Server is running at http://localhost:${config.HTTP_PORT}`);
});

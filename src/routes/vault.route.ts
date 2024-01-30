import express from 'express';

const router = express.Router();

//Import du controller
const vaultController = require("../controllers/vault.controller");


router.post('/',vaultController.create);
router.get('/',vaultController.open);
router.get('/export',vaultController.exportId);


module.exports = router
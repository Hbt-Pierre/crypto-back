import express from 'express';

const router = express.Router();

//Import du controller
const passwordController = require("../controllers/password.controller");


router.delete('/',passwordController.delete);
router.put('/',passwordController.edit);
router.post('/',passwordController.add);


module.exports = router
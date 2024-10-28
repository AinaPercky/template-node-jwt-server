const userController = require("../controller/userController")
const authenticateJWT = require('../middleware/authenticate');
const express = require('express');
const router = express.Router();

router.post("/create", userController.createUser)
router.get('/getAll',authenticateJWT,userController.getAllUser)
module.exports = router 
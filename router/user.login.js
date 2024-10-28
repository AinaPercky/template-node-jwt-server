const express = require('express');
const { loggedUser } = require('../controller/login');
const router = express.Router();

router.post('/', loggedUser);

module.exports = router;

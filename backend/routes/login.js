const express = require('express');
const router = express.Router();

const loginCtrl = require('../controllers/loginCtrl');
const limit = require('../middleware/ratelimit');


//Router
router.post('/signup', loginCtrl.signup);
router.post('/login', limit.ratelimit, loginCtrl.login);

module.exports = router;
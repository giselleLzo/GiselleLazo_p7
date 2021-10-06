const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usersCtrl');
const auth = require('../middleware/auth');


//Router
router.get('/userId', userCtrl.findOneUser);
router.get('/', auth, userCtrl.findAllUser);
router.delete('/:userId', auth, userCtrl.deleteOneUser);

module.exports = router;
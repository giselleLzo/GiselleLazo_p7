const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/usersCtrl');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


//Router
router.get('/userId', userCtrl.findOneUser);
router.get('/', auth, userCtrl.findAllUser);
router.put('/userId', multer, userCtrl.updateProfile);
router.delete('/:userId', auth, userCtrl.deleteOneUser);

module.exports = router;
const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messagesCtrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routes 
router.post('/new', multer, messageCtrl.createMessage);
router.get('/:id', auth, messageCtrl.findOneMessage);  
router.get('/', auth, messageCtrl.findAllMessage);  
router.delete('/:id', auth, messageCtrl.deleteOneMessage);

module.exports = router;
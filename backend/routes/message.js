const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messagesCtrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routes 
router.post('/new', multer, messageCtrl.createPost);
router.get('/:id', auth, messageCtrl.getOnePost);  
router.get('/', auth, messageCtrl.getAllPost);  
router.delete('/:id', auth, messageCtrl.deletePost);

module.exports = router;
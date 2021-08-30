const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/commentsCtrl');
const auth = require('../middleware/auth');


//Routes 
router.post('/:postId', commentCtrl.createComment);
router.get('/', auth, commentCtrl.getAllComment);  
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
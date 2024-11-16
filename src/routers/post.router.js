const postController = require('../controllers/post.controller');
const router = require('express').Router();

router.post('/post',postController.crearPost());

module.exports = router;
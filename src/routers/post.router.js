const postController = require('../controllers/post.controller');
const verifyToken = require('../middlewares/verifyJWT.middleware');
const router = require('express').Router();

router.get('/posts',postController.listarPosts());
router.get('/posts/:id',postController.verPost());
router.post('/posts',verifyToken(),postController.crearPost());

module.exports = router;
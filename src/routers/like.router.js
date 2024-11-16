const likeController = require('../controllers/like.controller.js');
const router = require('express').Router();


router.get('/likes',likeController.listarlikes());
router.get('/likes/:id',likeController.verLikes());
router.post('/likes',likeController.crearLike());

module.exports = router;
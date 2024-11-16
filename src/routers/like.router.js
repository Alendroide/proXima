const likeController = require('../controllers/like.controller.js');
const router = require('express').Router();


router.get('/like',likeController.listarlikes());
router.get('/like/:id',likeController.verLikes());
router.post('/like'likeController.crearLike());
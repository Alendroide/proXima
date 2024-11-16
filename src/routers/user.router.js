const userController = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/users',userController.listarUsuarios());
router.get('/users/:id',userController.verUsuario());
router.post('/register',userController.crearUsuario());
router.post('/login',userController.loguearUsuario());

module.exports = router;
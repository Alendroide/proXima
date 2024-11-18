const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT.middleware');
const verification = require('../controllers/jwt.controller');

router.get('/token',verifyJWT(),verification());

module.exports = router;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = () => (req,res,next) => {
    const token = req.header('Auth')
    if(!token){
        return res.status(403).json({msg:"No autorizado"});
    }
    try{
        const logged = jwt.verify(token,process.env.SECRET_WORD);
        if(!logged){
            return res.status(403).json({msg:"Token inválido o expirado"});
        }
        next();
    }
    catch(error){
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ msg: "Token expirado" });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ msg: "Token inválido" });
        }
        return res.status(500).json(error);
    }
}

module.exports = verifyToken;
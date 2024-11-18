require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const verification = () => async(req,res) => {
    const token = req.header('Authentication');
    const {id} = jwt.verify(token,process.env.SECRET_WORD);
    const {username,img} = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return res.status(200).json({msg:"success",id,username,img});
}

module.exports = verification;
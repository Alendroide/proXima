const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const listarlikes = () => async(req,res) =>{
    try{
        const likes = await prisma.like.findMany();
        return res.status(200).json(likes);
    }catch(error){
        console.error(error);
        return res.satus(500).json(error);
    }
}

const verLikes = () => async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const like = await prisma.like.findUnique({
            where:{
                id
            }
        })
        return res.status(200).json(like);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

const crearLike = () => async(req,res) =>{
    try{
        //Pegado por pepe
        const token = req.header('Auth');
        const user = jwt.verify(token,process.env.SECRET_WORD);
        const id = user.id;

        const data = req.body;
        const like = await prisma.like.create({
            data:{
                userId : id,
                postId : data.postId
            },
        });
        return res.status(201).json(like);
    }catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}



module.exports = {listarlikes,verLikes,crearLike};
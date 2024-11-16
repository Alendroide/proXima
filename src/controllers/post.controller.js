const {PrismaClient} = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
require('dotenv').config()

const listarPosts = () => async(req,res) => {
    try{
        const posts = await prisma.post.findMany();
        return res.status(200).json(posts);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

const verPost = () => async(req,res) => {
    try{
        const id = req.body.id;
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });
        return res.status(200).json(post);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

const crearPost = () => async(req,res) => {
    try{
        //Sacar id de usuario desde el JWT
        const token = req.header('Auth');
        const user = jwt.verify(token,process.env.SECRET_WORD);
        const id = user.id;

        const body = req.body;
        const post = await prisma.post.create({
            data : {
                content : body.content,
                img : body.img,
                authorId : id
            }
        });
        return res.status(201).json(post);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

module.exports = {listarPosts,verPost,crearPost}
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const listarUsuarios = () => async(req,res) => {
    try{
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

const verUsuario = () => async(req,res) => {
    try{
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where : {
                id
            }
        })
        return res.status(200).json(user);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

const crearUsuario = () => async(req,res) => {
    try{
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password,10);
        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                bio: data.bio,
                password: hashedPassword
            },
        });
        return res.status(201).json(user);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

const loguearUsuario = () => async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })
        const logged = await bcrypt.compare(password,user.password);
        if(logged){
            const token = jwt.sign({id : user.id},process.env.SECRET_WORD,{expiresIn : '1h'});
            return res.status(200).json({token});
        }
        else{
            return res.status(400).json({error:"Contraseña incorrecta"});
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
}

module.exports = {listarUsuarios,verUsuario,crearUsuario,loguearUsuario};
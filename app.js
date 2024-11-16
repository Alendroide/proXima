const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/home',(req,res)=>{
    res.status(200).json({
        msg : 'Página de inicio'
    });
});

app.use((req,res)=>{
    res.status(404).json({
        msg : '404: Not found'
    });
});

module.exports = app;
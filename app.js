const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const jwtRouter = require('./src/routers/jwt.router');
const userRouter = require('./src/routers/user.router');
const postRouter = require('./src/routers/post.router');
const likeRouter = require('./src/routers/like.router');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan())
app.use(express.static('public'));


app.use('/api',jwtRouter);
app.use('/api',userRouter);
app.use('/api',postRouter);
app.use('/api',likeRouter);

app.use((req,res)=>{
    res.status(404).json({
        msg : '404: Not found'
    });
});

module.exports = app;
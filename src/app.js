const express= require('express')
const cookieParser = require('cookie-parser')
const authrouter=require('./routes/authroutes')

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authrouter)

app.get('/',(req,res)=>{
    res.send("Hello World")
})

module.exports = app;
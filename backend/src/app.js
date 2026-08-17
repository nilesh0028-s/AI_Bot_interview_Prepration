const express= require('express')
const cookieParser = require('cookie-parser')
const authrouter=require('./routes/authroutes')
const cors= require("cors")

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authrouter)

app.get('/',(req,res)=>{
    res.send("Hello World")
})

module.exports = app;
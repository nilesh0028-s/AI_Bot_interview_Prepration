const express= require('express')
const cookieParser = require('cookie-parser')
const authrouter=require('./routes/authroutes')
const interviewrouter= require('./routes/interviewroutes')
const cors= require("cors")



const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authrouter)
app.use('/api/interview', interviewrouter)



module.exports = app;
const express= require('express')
const cookieParser = require('cookie-parser')
const authrouter=require('./routes/authroutes')
const interviewrouter= require('./routes/interviewroutes')
const cors= require("cors")
const path = require("path")



const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authrouter)
app.use('/api/interview', interviewrouter)



// Serve the compiled React application copied into backend/public.
app.use(express.static(path.join(__dirname, "../public")));

// Let React Router handle client-side routes such as /login and /interview/:id.
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;

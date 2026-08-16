const express = require("express");
const { register, login, logout,getProfile } = require("../controller/userController");
const{protectRoute} = require("../middleware/authmiddleware")

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.get("/logout", logout);

authrouter.get("/get-me", protectRoute, getProfile)

module.exports = authrouter;
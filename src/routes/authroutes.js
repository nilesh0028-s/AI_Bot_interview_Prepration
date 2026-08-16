const express = require("express");
const { register, login } = require("../controller/userController");

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);

module.exports = authrouter;
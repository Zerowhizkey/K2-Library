const express = require("express");

const controller = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", controller.reg);
authRouter.post("/login", controller.log);

module.exports = authRouter;

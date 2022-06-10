const express = require("express");

const controller = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/", controller.getAllUsers);
userRouter.get("/:id", controller.getSingleUsers);
// userRouter.post("/lend", controller.lendBook);
// userRouter.post("/return", controller.returnBook);

module.exports = userRouter;

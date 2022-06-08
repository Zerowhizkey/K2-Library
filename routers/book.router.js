const express = require("express");

const controller = require("../controllers/book.controller");

const bookRouter = express.Router();

bookRouter.get("/", controller.getAllBooks);
bookRouter.get("/:id", controller.getSingleBooks);
bookRouter.post("/", controller.postBook);
bookRouter.delete("/:id", controller.removeSingleBook);
bookRouter.put("/:id", controller.fullEditBook);
bookRouter.patch("/:id", controller.editBook);

module.exports = bookRouter;

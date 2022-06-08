const express = require("express");

const bookRouter = require("./routers/book.router");

const app = express();

app.use(express.json());

app.use("/books", bookRouter);

app.listen(4000, () => {
	console.log("Servern körs på port 4000");
});

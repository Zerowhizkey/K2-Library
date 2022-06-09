const express = require("express");
const bookRouter = require("./routers/book.router");
const userRouter = require("./routers/user.router");
const authRouter = require("./routers/auth.router");
const app = express();

app.use(express.json());

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
	console.error(error.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

app.listen(4000, () => {
	console.log("Servern körs på port 4000");
});

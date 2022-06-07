const express = require("express");
const book = require("./models/book");

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
	const { title, author, pages } = req.body;

	if (!title || !author || !pages) {
		res.status(400).send("You got to send all Input");
	}

	// const existingBook = await book.getSingle(id);
	// console.log(existingBook);
	// if (existingBook) {
	// 	return res.status(400).send("Book already exists!");
	// }

	const newBook = {
		title,
		author,
		pages,
	};

	await book.addOne(newBook);
	res.json(newBook);
});

app.get("/welcome", async (req, res) => {
	const books = await book.getAll();
	res.json(books);
});

app.listen(4000, () => {
	console.log("Servern körs på port 4000");
});

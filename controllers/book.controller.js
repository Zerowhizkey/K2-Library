const model = require("../models/book");

async function getAllBooks(req, res) {
	const books = await model.getAll();
	res.json(books);
}

async function getSingleBooks(req, res) {
	const book = await model.getSingle(req.params.id);
	res.json(book);
}

async function postBook(req, res) {
	const { title, author, pages } = req.body;

	if (!title || !author || !pages) {
		res.status(400).send("You got to send all Input");
	}

	const newBook = {
		title,
		author,
		pages,
	};

	const result = await model.addOne(newBook);
	res.json({ id: result.lastID, ...newBook });
}

async function removeSingleBook(req, res) {
	const result = await model.deleteOne(req.params.id);
	if (result.changes === 0) {
		return res.status(400).json({ message: "bad request" });
	}
	res.status(200).json({ message: "succesfully deleted!" });
}

module.exports = {
	getAllBooks,
	getSingleBooks,
	postBook,
	removeSingleBook,
};

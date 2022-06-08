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

async function fullEditBook(req, res) {
	if (
		// !req.params.id ||
		!req.body.title ||
		!req.body.author ||
		!req.body.pages
	) {
		return res.status(400).json({ message: "u suckie" });
	}
	model.fullEdit(
		req.params.id,
		req.body.title,
		req.body.author,
		req.body.pages
	);
	const result = await model.getSingle(req.params.id);

	res.status(200).json({ message: "u goodie!", updated: req.body });
}

async function editBook(req, res) {
	if (!req.body.title && !req.body.author && !req.body.pages) {
		return res.status(400).json({ message: "u suckie" });
	}
	model.edit(req.params.id, req.body.title, req.body.author, req.body.pages);
	const result = await model.getSingle(req.params.id);
	console.log(result);
	res.status(200).json({ message: "u goodie!", updated: req.body });
}

module.exports = {
	getAllBooks,
	getSingleBooks,
	postBook,
	removeSingleBook,
	fullEditBook,
	editBook,
};

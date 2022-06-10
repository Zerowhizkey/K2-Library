const model = require("../models/book");

async function getAllBooks(req, res) {
	const books = await model.getAll();
	if (!books) {
		return res.status(400).json({ error: "Cannot get Books" });
	}
	if (books.length === 0) {
		return res
			.status(200)
			.json({ status: "There are no books in the library" });
	}

	res.status(200).json({ status: "Request successfull", books });
}

async function getSingleBooks(req, res) {
	const book = await model.getSingle(req.params.id);
	if (!req.params.id || !book) {
		return res.status(404).json({ error: "Book not found" });
	}
	res.status(200).json({ status: "Request successfull", book });
}

async function postBook(req, res) {
	const { title, author, pages } = req.body;

	if (!title || !author || !pages) {
		res.status(400).json({ error: "Bad request" });
		return;
	}
	const existingBook = await model.getTitle(title);
	if (existingBook) {
		res.status(400).json({ error: "Book already exists" });
		return;
	}

	const newBook = {
		title,
		author,
		pages,
	};

	const result = await model.addOne(newBook);

	res.status(201).json({
		status: "Successfully created",
		id: result.lastID,
		...newBook,
	});
}

async function removeSingleBook(req, res) {
	const result = await model.deleteOne(req.params.id);
	if (result.changes === 0) {
		return res.status(400).json({ error: "Bad request" });
	}
	res.status(200).json({ status: "Succesfully removed" });
}

async function fullEditBook(req, res) {
	if (!req.body.title || !req.body.author || !req.body.pages) {
		res.status(400).json({ error: "Missing data" });
		return;
	}
	model.fullEdit(
		req.params.id,
		req.body.title,
		req.body.author,
		req.body.pages
	);
	const result = await model.getSingle(req.params.id);
	console.log(result);
	if (!result) {
		res.status(404).json({ error: "Could not find" });
		return;
	}
	console.log(result);
	res.status(200).json({ status: "Succesfully edited", updated: req.body });
}

async function editBook(req, res) {
	if (!req.body.title && !req.body.author && !req.body.pages) {
		res.status(400).json({ error: "Bad request" });
		return;
	}
	model.edit(req.params.id, req.body.title, req.body.author, req.body.pages);
	const result = await model.getSingle(req.params.id);
	if (!result) {
		res.status(400).json({ error: "Could not find" });
		return;
	}
	console.log(result);
	res.status(200).json({ status: "Succesfully edited", updated: req.body });
}

module.exports = {
	getAllBooks,
	getSingleBooks,
	postBook,
	removeSingleBook,
	fullEditBook,
	editBook,
};

const db = require("../config/db");

function getAll() {
	const sql = "SELECT * FROM books";

	return new Promise((resolve, reject) => {
		db.all(sql, (error, rows) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(rows);
		});
	});
}

function getSingle(id) {
	const sql = "SELECT * FROM books WHERE id = ?";
	return new Promise((resolve, reject) => {
		db.get(sql, id, (error, rows) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(rows);
		});
	});
}

function addOne(book) {
	const sql = "INSERT INTO books (title, author, pages) VALUES (?, ?, ?)";

	return new Promise((resolve, reject) => {
		db.run(sql, [book.title, book.author, book.pages], function (error) {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve(this);
		});
	});
}

function deleteOne(id) {
	const sql = "DELETE FROM books WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, id, function (error) {
			if (error) {
				console.log(error.message);
				reject(error);
			}

			resolve(this);
		});
	});
}

function fullEdit(id, title, author, pages) {
	const sql =
		"UPDATE books SET title = ?, author = ?, pages = ? WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, [title, author, pages, id], function (error) {
			if (error) {
				console.log(error.message);
				reject(error);
			}
			resolve(this);
		});
	});
}

function edit(id, title, author, pages) {
	const sql =
		"UPDATE books SET title = COALESCE(?, title), author = COALESCE(?, author), pages = COALESCE(?, pages) WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, [title, author, pages, id], function (error) {
			if (error) {
				console.log(error.message);
				reject(error);
			}
			resolve(this);
		});
	});
}

module.exports = {
	getAll,
	getSingle,
	addOne,
	deleteOne,
	fullEdit,
	edit,
};

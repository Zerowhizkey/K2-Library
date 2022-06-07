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

function getSingle() {
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
		db.run(sql, [book.title, book.author, book.pages], (error) => {
			if (error) {
				console.error(error.message);
				reject(error);
			}
			resolve();
		});
	});
}

module.exports = {
	getAll,
	getSingle,
	addOne,
};

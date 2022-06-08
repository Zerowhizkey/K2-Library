const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
	if (error) {
		console.error(error.message);
		throw error;
	}

	const booksStmt = `
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        pages TEXT
    )
    `;

	db.run(booksStmt, (error) => {
		if (error) {
			console.error(error.message);
			// throw error;
		}
	});
});

module.exports = db;

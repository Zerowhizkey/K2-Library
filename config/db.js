const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

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

	const usersStmt = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    `;

	db.run(booksStmt, (error) => {
		if (error) {
			console.error(error.message);
			// throw error;
		}
	});

	db.run(usersStmt, (error) => {
		if (error) {
			console.error(error.message);
			// throw error;
		} else {
			const insert =
				"INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
			db.run(
				insert,
				["ryandahl", "ryan@dahl.dk", md5("Macke123")],
				(error) => {
					if (error) {
						console.error(error.message);
					}
				}
			);
		}
	});
});

module.exports = db;

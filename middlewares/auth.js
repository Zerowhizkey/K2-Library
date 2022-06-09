require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	const token = req.headers["authorization"];

	console.log(token);

	if (!token) {
		return res.status(403).json({ error: "You dont have a valid token" });
	}

	const [prefix, jwtToken] = token.split(" ");

	try {
		const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
		req.user = decoded;
	} catch (error) {
		return res.status(400).json({ error: "Not a valid token" });
	}

	next();
}

module.exports = verifyToken;

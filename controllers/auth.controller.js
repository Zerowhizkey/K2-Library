require("dotenv").config();
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const model = require("../models/user");

async function reg(req, res) {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status(400).json({ error: "Bad request" });
	}
	const existingUser = await model.getEmail(email);
	if (existingUser) {
		return res.status(400).json({ error: "User already exists" });
	}
	const newUser = { username, email, password: md5(password) };
	await model.addOne(newUser);
	res.status(201).json({ status: "Successfully created", newUser });
}

async function log(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: "Bad request" });
	}
	const existingUser = await model.getEmail(email);
	if (!existingUser) {
		return res.status(400).json({ error: "User does not exist" });
	}
	const hashedPassword = md5(password);
	if (existingUser.password !== hashedPassword) {
		return res.status(400).json({ error: "Password did not match" });
	}
	const token = jwt.sign(
		{
			id: existingUser.id,
			username: existingUser.username,
			email: existingUser.email,
		},
		process.env.SECRET_KEY
	);
	res.status(200).json(token);
}

module.exports = {
	reg,
	log,
};

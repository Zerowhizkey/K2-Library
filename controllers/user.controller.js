const model = require("../models/user");

async function getAllUsers(req, res) {
	const users = await model.getAll();
	if (!users) {
		return res.status(400).json({ error: "Cannot get Users" });
	}

	res.status(200).json({ status: "Request successfull", users });
}

async function getSingleUsers(req, res) {
	const user = await model.getSingle(req.params.id);
	if (!req.params.id || !user) {
		return res.status(404).json({ error: "User not found" });
	}
	res.status(200).json({ status: "Request successfull", user });
}

module.exports = {
	getAllUsers,
	getSingleUsers,
};

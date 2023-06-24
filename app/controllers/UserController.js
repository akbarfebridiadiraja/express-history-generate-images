const config = require("../config");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

getUser = (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					code: 404,
					message: "User not found with id " + req.params.id,
				});
			}
			res.status(200).send({
				code: 200,
				message: "Success",
				user: user,
			});
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					code: 404,
					message: "User not found with id " + req.params.id,
				});
			}
			return res.status(500).send({
				code: 500,
				message: "Error retrieving User with id " + req.params.id,
			});
		});
};

updatePassword = (req, res) => {
	User.findById(req.params.id).then((user) => {
		if (!user) {
			return res
				.status(404)
				.send({ code: 404, messaage: "Akun belum terdaftar!" });
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.oldPassword,
			user.password
		);

		if (!passwordIsValid)
			return res
				.status(401)
				.send({ code: 401, messaage: "Invalid Password!" });

		// Update Password
		User.findByIdAndUpdate(
			req.params.id,
			{
				password: bcrypt.hashSync(req.body.newPassword, 10),
			},
			{ new: true }
		)

			.then((user) => {
				if (!user) {
					return res.status(404).send({
						code: 404,
						message: "User not found with id " + req.params.userId,
					});
				}
				res.status(200).send({
					code: 200,
					message: "Success",
					user: user,
				});
			})
			.catch((err) => {
				if (err.kind === "ObjectId") {
					return res.status(404).send({
						code: 404,
						message: "User not found with id " + req.params.userId,
					});
				}
				return res.status(500).send({
					code: 500,
					message:
						"Error retrieving User with id " + req.params.userId,
				});
			});
	});
};

deleteUser = (req, res) => {
	// Delete User
	User.findByIdAndRemove(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					code: 404,
					message: "User not found with id " + req.params.id,
				});
			}

			deleteHistoryGenerateImage(req, res);
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					code: 404,
					message: "User not found with id " + req.params.id,
				});
			}
			return res.status(500).send({
				code: 500,
				message: "Could not delete User with id " + req.params.id,
			});
		});
};

deleteHistoryGenerateImage = (req, res) => {
	GenerateImage.findByIdAndRemove({ userId: req.params.id })

		.then((generateImage) => {
			if (!generateImage) {
				return res.status(404).send({
					code: 404,
					message:
						"GenerateImage not found with id " + req.body.userId,
				});
			}
			res.status(200).send({
				code: 200,
				message: "Success",
			});
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					code: 404,
					message:
						"GenerateImage not found with userId " +
						req.body.userId,
				});
			}
			return res.status(500).send({
				code: 500,
				message:
					"Could not delete GenerateImage with id " + req.body.userId,
			});
		});
};

module.exports = { getUser, updatePassword, deleteUser };

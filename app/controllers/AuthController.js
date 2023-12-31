const config = require("../config");
const User = require("../models/UserModel");

const bcrypt = require("bcryptjs");

register = (req, res) => {
	User.findOne({ phone: req.body.phone }).then((findUser) => {
		if (findUser) {
			return res.status(400).send({
				code: 400,
				message: "No Hp sudah terdaftar!",
			});
		}

		const user = new User({
			name: req.body.name,
			phone: req.body.phone,
			password: bcrypt.hashSync(req.body.password, 10),
		});

		user.save()
			.then((user) => {
				res.status(201).send({
					code: 201,
					message: "Register Sukses!",
					user: user,
				});
			})
			.catch((err) => {
				res.status(500).send({
					code: 500,
					message:
						err.message ||
						"Some error occurred while creating the User.",
				});
			});
	});
};

login = (req, res) => {
	User.findOne({ phone: req.body.phone }).then((user) => {
		if (!user) {
			return res
				.status(404)
				.send({ code: 404, messaage: "Akun belum terdaftar!" });
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid)
			return res
				.status(401)
				.send({ code: 401, messaage: "Invalid Password!" });

		return res.status(200).send({
			code: 200,
			message: "Login Sukses!",
			user: {
				id: user._id,
				username: user.username,
			},
		});
	});
};

module.exports = { register, login };

const config = require("../config");
const GenerateImage = require("../models/GenerateImageModel");

fetchAll = (req, res) => {
	GenerateImage.find()
		.then((generateImages) => {
			res.status(200).send({
				code: 200,
				message: "Success",
				generateImages: generateImages,
			});
		})
		.catch((err) => {
			res.status(500).send({
				code: 500,
				message:
					err.message ||
					"Some error occurred while retrieving Gemar Baca.",
			});
		});
};

store = (req, res) => {
	// Create a GenerateImage
	const generateImage = new GenerateImage({
		prompt: req.body.prompt,
		imageUrl: req.body?.imageUrl,
		userId: req.body?.userId,
	});

	// Save GenerateImage in the database
	generateImage
		.save()
		.then((data) => {
			res.status(201).send({
				code: 201,
				message: "Success",
				generateImage: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				code: 500,
				message:
					err.message ||
					"Some error occurred while creating the GemarBaca.",
			});
		});
};

clearAll = (req, res) => {
	GenerateImage.deleteMany({ userId: req.params.userId })
		.then((data) => {
			res.status(200).send({
				code: 200,
				message: "Success",
			});
		})
		.catch((err) => {
			res.status(500).send({
				code: 500,
				message:
					err.message ||
					"Some error occurred while creating the GemarBaca.",
			});
		});
};

module.exports = { fetchAll, store, clearAll };

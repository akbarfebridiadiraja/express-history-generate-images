const config = require("../config");
const HistoryGenerateImage = require("../models/HistoryGenerateImageModel");

fetchAll = (req, res) => {
	HistoryGenerateImage.find()
		.then((data) => {
			res.status(200).send({
				code: 200,
				message: "Success",
				historyGenerateImages: data,
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
	// Create a HistoryGenerateImage
	const historyGenerateImage = new HistoryGenerateImage({
		prompt: req.body.prompt,
		imageUrl: req.body?.imageUrl,
		userId: req.body?.userId,
	});

	// Save GenerateImage in the database
	historyGenerateImage
		.save()
		.then((data) => {
			res.status(201).send({
				code: 201,
				message: "Success",
				historyGenerateImage: data,
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
	HistoryGenerateImage.deleteMany({ userId: req.params.userId })
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

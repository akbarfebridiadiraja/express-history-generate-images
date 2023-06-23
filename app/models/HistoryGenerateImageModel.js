const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create a new schema
const historyGenerateImageSchema = new Schema(
	{
		prompt: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
		},
		userId: {
			type: String,
		},
	},
	{ timestamps: true }
);

// Create a model based on the schema
const HistoryGenerateImage = mongoose.model(
	"HistoryGenerateImage",
	historyGenerateImageSchema
);

// Export the model
module.exports = HistoryGenerateImage;

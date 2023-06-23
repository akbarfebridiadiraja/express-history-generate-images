const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create a new schema
const generateImageSchema = new Schema(
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
const GenerateImage = mongoose.model("GenerateImage", generateImageSchema);

// Export the model
module.exports = GenerateImage;

import mongoose from 'mongoose';

// Inits
const Schema = mongoose.Schema;

export default new Schema(
	{
		text: {
			type: String,
			trim: true,
			required: [true, 'Question field is required'],
		},
		answers: {
			type: [String],
			trim: true,
			minlength: [1, 'Question must have atleast 1 answer'],
			required: [true, 'Answer field is required'],
		},
	},
	{ timestamps: true }
);

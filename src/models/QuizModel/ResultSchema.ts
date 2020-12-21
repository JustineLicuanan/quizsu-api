import mongoose from 'mongoose';

// Inits
const Schema = mongoose.Schema;

export default new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Name field is required'],
		},
		score: {
			type: Number,
			default: 0,
			required: true,
		},
	},
	{ timestamps: true }
);

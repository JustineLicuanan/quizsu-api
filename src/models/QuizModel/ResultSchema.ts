import mongoose from 'mongoose';

import AnswerSchema from './AnswerSchema';

// Inits
const Schema = mongoose.Schema;

export default new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Name field is required'],
		},
		answers: [AnswerSchema],
		score: Number,
	},
	{ timestamps: true }
);

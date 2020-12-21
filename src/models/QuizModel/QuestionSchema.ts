import mongoose from 'mongoose';

import { mustHaveOne } from '../../lib';

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
			type: [
				{
					type: String,
					trim: true,
					required: [true, 'Answer field is required'],
				},
			],
			validate: [mustHaveOne, 'Question must have atleast 1 answer'],
		},
	},
	{ timestamps: true }
);

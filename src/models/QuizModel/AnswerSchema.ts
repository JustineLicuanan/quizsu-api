import mongoose from 'mongoose';

// Inits
const Schema = mongoose.Schema;

export default new Schema(
	{
		questionId: (mongoose as any).ObjectId,
		answer: String,
		correct: Boolean,
	},
	{ timestamps: true }
);

import mongoose from 'mongoose';

import { IQuiz } from '../../types';
import QuestionSchema from './QuestionSchema';
import ResultSchema from './ResultSchema';

// Inits
const Schema = mongoose.Schema;

// Create quiz schema
const QuizSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Title field is required'],
		},
		password: {
			type: String,
			minlength: [8, 'Password must be atleast 8 characters long'],
			required: [true, 'Password field is required'],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		questions: {
			type: [QuestionSchema],
			minlength: [1, 'Quiz must have atleast 1 question'],
			required: [true, 'Question field is required'],
		},
		results: [ResultSchema],
	},
	{ timestamps: true }
);

export default mongoose.model<IQuiz>('user', QuizSchema);

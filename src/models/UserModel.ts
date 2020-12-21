import mongoose from 'mongoose';
import isEmail from 'validator/es/lib/isEmail';

import { hasRole, hasQuestion } from '../lib';
import { IUser } from '../types';

// Inits
const Schema = mongoose.Schema;

// Create user schema
const UserSchema = new Schema(
	{
		role: {
			type: Number,
			validate: [hasRole, 'Role must be valid'],
			required: [true, 'Role field is required'],
		},
		name: {
			type: String,
			trim: true,
			required: [true, 'Name field is required'],
		},
		email: {
			type: String,
			lowercase: true,
			validate: [isEmail, 'Email must be valid'],
			unique: true,
			required: [true, 'Email field is required'],
		},
		password: {
			type: String,
			minlength: [8, 'Password must be atleast 8 characters long'],
			required: [true, 'Password field is required'],
		},
		secretQuestion: {
			question: {
				type: String,
				validate: [hasQuestion, 'Question must be valid'],
				required: [true, 'Question field is required'],
			},
			answer: {
				type: String,
				required: [true, 'Answer field is required'],
			},
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>('user', UserSchema);

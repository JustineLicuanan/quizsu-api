import { Document } from 'mongoose';

export enum ERole {
	admin = 1,
	teacher,
	student,
}

export enum ESecretQuestion {
	'first' = 'What is your favorite song?',
	'second' = "What is your mother's maiden name?",
	'third' = 'Who is your favorite artist?',
	'fourth' = "What is your pet's name?",
	'fifth' = 'What hobby you enjoy the most?',
}

export type TRole = ERole.admin | ERole.teacher | ERole.student;

export type TSecretQuestion = 'first' | 'second' | 'third' | 'fourth' | 'fifth';

export interface ISecretQuestion {
	question: TSecretQuestion;
	answer: string;
}

export interface IUser extends Document {
	role: TRole;
	name: string;
	email: string;
	password: string;
	secretQuestion: ISecretQuestion;
}

export interface IQuestion {
	text: string;
	answers: string[];
}

export interface IResult {
	name: string;
	score: number;
}

export interface IQuiz extends Document {
	title: string;
	password: string;
	disabled: boolean;
	questions: IQuestion;
	results: IResult;
}

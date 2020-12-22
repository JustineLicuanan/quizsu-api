import { Document } from 'mongoose';

export interface IQuestion extends Document {
	text: string;
	answers: string[];
}

export interface IResult extends Document {
	name: string;
	score: number;
}

export interface IQuiz extends Document {
	title: string;
	password: string;
	disabled: boolean;
	questions: IQuestion[];
	results?: IResult[];
}

export interface IReqQuiz {
	title: IQuiz['title'];
	password: IQuiz['password'];
	questions: IQuiz['questions'];
}

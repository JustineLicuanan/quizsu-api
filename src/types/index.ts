import { Document } from 'mongoose';

export interface IQuestion extends Document {
	text: string;
	answers: string[];
}

export interface IQuizAnswer extends Document {
	questionId: any;
	answer: string;
	correct?: boolean;
}

export interface IResult {
	_id?: any;
	name: string;
	answers: IQuizAnswer[];
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

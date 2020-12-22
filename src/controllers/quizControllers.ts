import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { IQuizAnswer, IResult, IReqQuiz } from '../types';
import Quiz from '../models/QuizModel';

// Create a quiz
export const createPOST = async (req: Request, res: Response) => {
	try {
		const { title, password, questions }: IReqQuiz = req.body;
		const quiz = new Quiz({
			title,
			password,
		});

		// Push questions to questions array in database
		quiz.questions.push(...questions);

		// Hash quiz password
		const salt = await bcrypt.genSalt(10);
		quiz.password = await bcrypt.hash(quiz.password, salt);

		// Save new quiz to database
		await quiz.save();

		res.status(201).json({
			success: true,
			message: 'Quiz created successfully',
			_id: quiz._id,
		});
	} catch (error) {
		let err: any = {};

		// Handle validation errors
		if (error._message === 'quiz validation failed') {
			Object.keys(error.errors).forEach((errPath) => {
				err[errPath] = error.errors[errPath].message;
			});
			res.status(400).json({ err });
			return;
		}

		// Handle other errors
		res.status(400).json({
			err: true,
			message: error.message,
		});
	}
};

// Get quiz results
export const quizResultsPOST = (req: Request, res: Response) => {};

// Pass the quiz
export const passQuizPOST = async (req: Request, res: Response) => {
	interface ReqBody {
		name: string;
		answers: IQuizAnswer[];
	}

	try {
		const { name, answers }: ReqBody = req.body;
		const quiz = await Quiz.findById(req.params.id);

		// Check if quiz existing
		if (!quiz) {
			res.status(400).json({
				err: true,
				message: 'Quiz not found',
			});
			return;
		}

		// Check if quiz disabled
		if (quiz.disabled) {
			res.status(401).json({
				err: true,
				message: 'Quiz is now disabled',
			});
			return;
		}

		if (!Array.isArray(answers)) {
			res.status(400).json({
				err: true,
				message: 'Answers must be an array',
			});
			return;
		}

		// Check if all questions are answered
		if (quiz.questions.length > answers.length) {
			res.status(400).json({
				err: true,
				message: 'All questions required an answer',
			});
			return;
		}

		// Check if answers are more than the questions
		if (quiz.questions.length < answers.length) {
			res.status(400).json({
				err: true,
				message: "Answers can't be more than the questions",
			});
			return;
		}

		// Check if all question answered in answers array is in questions array
		const answeredQuestions = quiz.questions.filter((question) =>
			answers.find(({ questionId, answer }) => {
				if (!question._id.equals(questionId)) return false;
				if (typeof answer === 'string' && answer.trim()) return true;
				if (typeof answer === 'number') return true;
				return false;
			})
		);
		if (answeredQuestions.length !== quiz.questions.length) {
			res.status(400).json({
				err: true,
				message: 'All questions required an answer',
			});
			return;
		}

		// Check user answers
		const orderedAnswers: IQuizAnswer[] = [];
		let score = 0;
		quiz.questions.forEach((question) => {
			const answer = answers.find(({ questionId }) =>
				question._id.equals(questionId)
			) as IQuizAnswer;
			answer.answer = answer.answer.trim();

			// Check if user answers are correct
			if (!question.answers.includes(answer.answer)) {
				answer.correct = false;
				orderedAnswers.push(answer);
				return;
			}

			score++;
			answer.correct = true;
			orderedAnswers.push(answer);
		});

		quiz.results?.push({
			name,
			answers: orderedAnswers,
			score,
		});

		// Save new quiz to database
		await quiz.save();

		res.status(201).json({
			success: true,
			message: 'Quiz created successfully',
			resultId: (quiz.results as IResult[])[
				(quiz.results as IResult[]).length - 1
			]._id,
		});
	} catch (err) {
		res.status(400).json({
			err: true,
			message: err.message,
		});
	}
};

// Take a quiz
export const takeQuizGET = async (req: Request, res: Response) => {
	try {
		const quiz = await Quiz.findById(req.params.id).select(
			'-password -results -createdAt -updatedAt -__v'
		);

		// Check if quiz existing
		if (!quiz) {
			res.status(400).json({
				err: true,
				message: 'Quiz not found',
			});
			return;
		}

		// Check if quiz disabled
		const { _id, disabled, title } = quiz;
		if (disabled) {
			res.status(401).json({
				err: true,
				message: 'Quiz is now disabled',
			});
			return;
		}

		res.json({
			_id,
			disabled,
			title,
			questions: quiz.questions.map(({ _id, text }) => ({
				_id,
				text,
			})),
		});
	} catch (err) {
		res.status(400).json({
			err: true,
			message: err.message,
		});
	}
};

// Disable a quiz
export const disableQuizPATCH = (req: Request, res: Response) => {};

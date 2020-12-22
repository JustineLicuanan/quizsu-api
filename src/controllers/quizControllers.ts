import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { IReqQuiz } from '../types';
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
export const passQuizPOST = (req: Request, res: Response) => {};

// Take a quiz
export const takeQuizGET = async (req: Request, res: Response) => {
	try {
		const quiz = await Quiz.findById(req.params.id).select(
			'-password -results -createdAt -updatedAt -__v'
		);

		if (!quiz) {
			res.status(400).json({
				err: true,
				message: 'Quiz not found',
			});
			return;
		}

		const { _id, disabled, title } = quiz;

		if (quiz.disabled) {
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

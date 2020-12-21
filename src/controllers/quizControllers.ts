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
export const takeQuizGET = (req: Request, res: Response) => {};

// Disable a quiz
export const disableQuizPATCH = (req: Request, res: Response) => {};

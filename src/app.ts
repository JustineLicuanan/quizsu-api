import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes';
import quizRoutes from './routes/quizRoutes';

// Inits
dotenv.config();
const { DB_URI, PORT = '3002' } = process.env;
const app = express();

// Connect to database
mongoose
	.connect(DB_URI as string, {
		// Remove deprecation warnings in the console
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Connected to database successfully');

		// Start the server
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
	})
	.catch((err) => console.log(err));

// Routes
app.use('/user', userRoutes);
app.use('/quiz', quizRoutes);

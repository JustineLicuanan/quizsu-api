import express from 'express';

import * as controller from '../controllers/quizControllers';

// Inits
const router = express.Router();

// Routes
router.post('/create', controller.createPOST);
router.get('/get/:id', controller.getQuizGET);

export default router;

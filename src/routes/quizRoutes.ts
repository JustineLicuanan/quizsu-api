import express from 'express';

import * as controller from '../controllers/quizControllers';

// Inits
const router = express.Router();

// Routes
router.post('/create', controller.createPOST);
router.post('/results/:id', controller.quizResultsPOST);
router.post('/pass/:id', controller.passQuizPOST);
router.get('/take/:id', controller.takeQuizGET);
router.patch('/disable/:id', controller.disableQuizPATCH);

export default router;

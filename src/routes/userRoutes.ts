import express from 'express';

import * as controller from '../controllers/userControllers';

// Inits
const router = express.Router();

// Routes
router.post('/register', controller.registerPOST);
router.post('/login', controller.loginPOST);
router.post('/forgot-pass/:id', controller.forgotPassPOST);
router.get('/logout', controller.logoutGET);
router.get('/profile', controller.profileGET);
router.patch('/profile/update', controller.profileUpdatePATCH);
router.patch('/profile/change-pass', controller.profileChangePassPATCH);
router.patch('/profile/change-secret', controller.profileChangeSecretPATCH);
router.patch('/reset-pass', controller.resetPassPATCH);
router.delete('/profile/delete', controller.profileDeleteDELETE);

export default router;

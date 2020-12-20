import { Request, Response } from 'express';

// Register a user
export const registerPOST = (req: Request, res: Response) => {};

// Login to server
export const loginPOST = (req: Request, res: Response) => {};

// Logout from server
export const logoutGET = (req: Request, res: Response) => {};

// View user profile
export const profileGET = (req: Request, res: Response) => {};

// Update user profile
export const profileUpdatePATCH = (req: Request, res: Response) => {};

// Change user password
export const profileChangePassPATCH = (req: Request, res: Response) => {};

// Delete user account
export const profileDeleteDELETE = (req: Request, res: Response) => {};

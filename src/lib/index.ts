import { ERole, ESecretQuestion } from '../types';

// Check if role is in the enum
export const hasRole = (role: number) => Object.values(ERole).includes(role);

// Check if question is in the enum
export const hasQuestion = (question: string) =>
	Object.keys(ESecretQuestion).includes(question);

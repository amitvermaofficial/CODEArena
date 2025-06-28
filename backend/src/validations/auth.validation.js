import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('username', 'Username is required').not().isEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

export const loginValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
];
import { ApiResponse } from '../utils/ApiResponse.js';

// Middleware to check if the user is logged in
export const protect = (req, res, next) => {
    if (req.isAuthenticated()) { // This method is provided by Passport
        return next();
    }
    res.status(401).json(new ApiResponse(401, null, "Unauthorized: You must be logged in to access this resource."));
};

// Middleware to check for admin role
export const admin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json(new ApiResponse(403, null, "Forbidden: You do not have admin privileges."));
};
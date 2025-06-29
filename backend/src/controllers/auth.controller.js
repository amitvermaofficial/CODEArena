import { registerUserService, loginUserService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

import '../config/passport.config.js';

// Controller for local registration
export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { user, token } = await registerUserService(req.body);
        
        req.login(user, (err) => {
            if (err) { return next(err); }
            return res.status(201).json(new ApiResponse(201, user, "User registered and logged in successfully"));
        });
        
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, error.message));
    }
});

// Controller for successful local login (actual auth is in middleware)
export const loginSuccess = (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, "Login successful"));
};

// Controller for local login
export const loginUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    console.log("chal gaya login ka feature: ", { email, username, password });
    const result = await loginUserService({ email, username, password });
    res.status(200).json({
      statusCode: 200,
      data: result,
      message: "Login successful",
      success: true
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      data: null,
      message: error.message,
      success: false
    });
  }
};

// Controller for login failure (actual auth is in middleware)
export const loginFailure = (req, res) => {
    // Passport flash messages can be used here if you set it up
    res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
};

// This is the callback for all successful OAuth logins
export const oauthCallback = (req, res) => {
    // Redirect to your frontend dashboard or home page
    res.redirect(`${process.env.CORS_ORIGIN}/dashboard`);
};

// Controller for getting the current user's data
export const getMe = (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, "User data fetched successfully"));
};

// Controller for logging out
export const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy((err) => {
            if (err) { return next(err); }
            res.clearCookie('connect.sid'); // The default session cookie name
            res.status(200).json(new ApiResponse(200, null, "Logout successful"));
        });
    });
};
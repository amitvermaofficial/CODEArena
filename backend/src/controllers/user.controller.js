import { getUserProfileService } from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const getConnections = asyncHandler(async (req, res) => {
    res.send('Get user connections');
});

export const sendConnectionRequest = asyncHandler(async (req, res) => {
    res.send('Send connection request');
});

export const acceptConnectionRequest = asyncHandler(async (req, res) => {
    res.send('Accept connection request');
});

export const removeConnection = asyncHandler(async (req, res) => {
    res.send('Remove connection');
});

export const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await getUserProfileService(username);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Consider what data to return, excluding sensitive info like password
    const userProfile = {
        username: user.username,
        email: user.email, // You might exclude this in a real application
        fullName: user.fullName,
        profilePic: user.profilePic,
        // ... other public profile fields
    };

    return res.status(200).json(new ApiResponse(200, userProfile, "User profile fetched successfully"));
};

export const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('Update user profile');
});
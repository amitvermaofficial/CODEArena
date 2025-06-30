import { User } from '../models/user/user.model.js';
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
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user; // From 'protect' middleware

    // 1. Define the ONLY fields a user is allowed to update.
    const allowedFields = [
        'fullName',
        'profilePic',
        'location',
        'website',
        'socialLinks',
        'skills',
        'bio'
    ];

    // 2. Create an update object with only the allowed fields from the request body.
    const updates = {};
    for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }

    // If a user sends { "role": "admin" }, it will be ignored because "role" is not in `allowedFields`.

    // 3. Perform the update with the sanitized data.
    const updatedUser = await User.findByIdAndUpdate(_id, { $set: updates }, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});
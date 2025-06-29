import { User } from '../models/user/user.model.js';

export const getUserProfileService = async (username) => {
    try {
        const user = await User.findOne({ username }).select('-password'); // Exclude password
        return user;
    } catch (error) {
        // Handle potential database errors
        throw new Error(`Error fetching user profile: ${error.message}`);
    }
};
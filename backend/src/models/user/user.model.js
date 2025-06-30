import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 30,
        index: true, // For faster lookups
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    // Password is now optional, for users who sign up via OAuth
    password: {
        type: String,
        required: false, 
        minlength: 6,
        select: false, // Prevent password from being sent to client by default
    },
    fullName: { // Renamed for consistency
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    profilePic: {
        type: String,
        default: "https://icon-library.com/images/default-user-icon/default-user-icon-6.jpg",
    },
    connections: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ], // Server-managed: Only modified by connection logic
    problemSolved: [
        { type: Schema.Types.ObjectId, ref: 'Problem' }
    ], // Server-managed: Only modified upon successful problem submission
    contestWon: [
        { type: Schema.Types.ObjectId, ref: 'Contest' }
    ], // Server-managed: Only modified when a contest is won
    badges: [
        { type: Schema.Types.ObjectId, ref: 'Badge' }
    ], // Server-managed: Only awarded by the server based on achievements
    // Additional fields for user profile
    location: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    socialLinks: {
        github: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        }
    },
    skills: [{
        type: String,
        trim: true
    }],
    bio: {
        type: String,
        default: ''
    },
    // Fields to store OAuth provider IDs
    googleId: {
        type: String,
        immutable: true, // Should not change after being set
    },
    githubId: {
        type: String,
        immutable: true, // Should not change after being set
    },
    linkedinId: {
        type: String,
        immutable: true, // Should not change after being set
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        select: false, // Hide from general queries
        immutable: true, // Prevent modification except by special admin logic
    },
    // ... other fields like connections, stats, etc.
}, { timestamps: true });

// Pre-save hook to hash password if it's provided/modified
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords for local login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
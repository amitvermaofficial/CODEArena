// models/User.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
    },
    profilePic: {
        type: String,
        default: 'default_avatar_url'
    },
    bio: {
        type: String,
        default: ''
    },
    // Fields to store OAuth provider IDs
    googleId: {
        type: String,
    },
    githubId: {
        type: String,
    },
    linkedinId: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
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
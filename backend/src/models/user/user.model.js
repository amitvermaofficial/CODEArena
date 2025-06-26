import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true // Remember to hash this!
    },
    fullName: {
        type: String,
        required: true
    },
    // NEW: Role for Admin access
    role: {
        type: String,
        enum: ['user', 'admin'], // You can add 'moderator', 'sponsor' later
        default: 'user'
    },
    profilePictureUrl: {
        type: String,
        default: 'https://default-avatar-url.com/avatar.png'
    },
    bio: {
        type: String,
        maxlength: 250
    },
    // ... all other fields from the previous schema remain the same
    location: { type: String },
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        website: String
    },
    stats: {
        points: { type: Number, default: 0 },
        problemsSolved: {
            total: { type: Number, default: 0 },
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 }
        }
    },
    badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    connectionRequests: [{
        from: { type: Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending'], default: 'pending' }
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User; // Using default export for ES Modules
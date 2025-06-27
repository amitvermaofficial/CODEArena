// services/auth.service.js
import { User } from '../models/User.model.js'; // Your Mongoose user model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const registerUserService = async (userData) => {
    const { username, email, password } = userData;

    // 1. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user in DB
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // 4. Return user data and token
    if (user) {
        const userResponse = user.toObject();
        delete userResponse.password; // Don't send password back
        return { user: userResponse, token: generateToken(user._id) };
    } else {
        throw new Error("Invalid user data");
    }
};

export const loginUserService = async (loginData) => {
    const { email, password } = loginData;

    // 1. Find user by email
    const user = await User.findOne({ email });

    // 2. Check user and compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = user.toObject();
        delete userResponse.password;
        return { user: userResponse, token: generateToken(user._id) };
    } else {
        throw new Error("Invalid credentials");
    }
};